import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import Header from '../component/layout/Header';
import '../css/Home.css';
import FilterComp from '../component/shared/FilterComp';
import Badges from '../component/home/TabletBadge';
import FilterModal from '../component/modal/Filter';
import NavCards from '../component/home/NavCards';
import NewsCard from '../component/home/NewsCard';
import { fetchNewsDataFromApis } from '../newsServices';
import dayjs from 'dayjs';

export type NewsData = {
  api: string;
  category: string;
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string | null;
};

export interface FilterFormValuesTypes {
  date: string;
  sources: string[];
  categories: string[];
  authors: string[];
}

const Home: React.FC = (): JSX.Element => {
  // Initial Values
  const initialValues: FilterFormValuesTypes = {
    date: '',
    sources: [],
    categories: [],
    authors: [],
  };

  let array: NewsData[] = [
    {
      api: '',
      category: '',
      source: {
        id: '',
        name: '',
      },
      author: '',
      title: '',
      description: '',
      url: '',
      urlToImage: '',
      publishedAt: '',
      content: '',
    },
  ];

  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [initialFilterValues, setInitialFilterValues] = useState<FilterFormValuesTypes>(initialValues);
  const [selectedSourceTab, setSelectedSourceTab] = useState<string>('');
  const [newsData, setNewsData] = useState<NewsData[]>(array);
  const copyNewsData = useRef(array);

  const debounceFunc = (
    func: (event: React.ChangeEvent<HTMLInputElement>) => void,
    delay: number
  ) => {
    let timer: NodeJS.Timeout;

    return (event: React.ChangeEvent<HTMLInputElement>) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(event);
      }, delay);
    };
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchData = copyNewsData.current.filter((data) =>
      data.title.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase())
    );
    setSelectedSourceTab('');
    setInitialFilterValues(initialValues);
    setNewsData(searchData);
  };

  const debouncedSearch = debounceFunc(handleSearch, 300);

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = useCallback(() => {
    setIsFilterModalOpen(false);
  }, []);

  const handleSubmitFilterData = useCallback(
    (filterValues: FilterFormValuesTypes) => {
      const filterDate = filterValues.date ? dayjs(filterValues.date).startOf('day') : '';
      const noFiltersProvided =
        !filterDate &&
        filterValues.sources.length === 0 &&
        filterValues.categories.length === 0 &&
        filterValues.authors.length === 0;

      if (noFiltersProvided) {
        setNewsData(copyNewsData.current);
        handleCloseFilterModal();
        return;
      }
      const filteredData = copyNewsData.current.filter((newsData) => {
        const itemDate = dayjs(newsData.publishedAt).startOf('day');
        return (
          (itemDate.isBefore(filterDate) || itemDate.isSame(filterDate)) || // Date check
          filterValues.sources.includes(newsData.source.name) || // Source check
          (newsData.author && filterValues.authors.includes(newsData.author)) || // Author check
          filterValues.categories.includes(newsData.category) // Category check
        );
      });

      setNewsData(filteredData);
      setInitialFilterValues(filterValues);
      handleCloseFilterModal();
    },
    [copyNewsData, handleCloseFilterModal]
  );

  const handleFilterBadgeClick = (): void => {
    handleOpenFilterModal();
  };

  const handleSourceTabClick = (source: string) => {
    if (source === selectedSourceTab) return setSelectedSourceTab('');
    setSelectedSourceTab(source);
  };

  useEffect(() => {
    const getNews = async () => {
      const data = await fetchNewsDataFromApis();
      setNewsData(data);
      copyNewsData.current = data;
    };

    getNews();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(copyNewsData.current.map((item) => item.category).filter(Boolean))].map((category) => ({
      value: category,
      label: category,
    }));
  }, [newsData]);

  const sources = useMemo(() => {
    return [...new Set(copyNewsData.current.map((item) => item.source.name).filter(Boolean))].map((source) => ({
      value: source,
      label: source,
    }));
  }, [newsData]);

  const authors = useMemo(() => {
    return [...new Set(copyNewsData.current.map((item) => item.author).filter(Boolean))].map((author) => ({
      value: author,
      label: author,
    }));
  }, [newsData]);

  return (
    <main>
      <Header handleSearch={debouncedSearch} />
      <article className="news-feed-container">
        <section className="sources-nav">
          <NavCards
            title={"News Api"}
            selected={selectedSourceTab}
            onClick={() => handleSourceTabClick("News Api")}
          />
          <NavCards
            title={"Guardian Api"}
            selected={selectedSourceTab}
            onClick={() => handleSourceTabClick("Guardian Api")}
          />
          <NavCards
            title={"New York Api"}
            selected={selectedSourceTab}
            onClick={() => handleSourceTabClick("New York Api")}
          />
        </section>

        {Object.keys(initialFilterValues).some((key) => {
          const eachFilterValue = initialFilterValues[key as keyof FilterFormValuesTypes];
          return eachFilterValue && eachFilterValue.length > 0; // Check if there's any valid data
        }) && (
          <section className="filter-list">
            <label>Filters:</label>
            {Object.keys(initialFilterValues).map((value: string): JSX.Element | string => {
              const key = value as keyof FilterFormValuesTypes;
              const eachFilterValue = initialFilterValues[key];

              if (!eachFilterValue || !eachFilterValue.length) return ''; // Skip empty or undefined values

              if (Array.isArray(eachFilterValue)) {
                return (
                  <Badges
                    key={value}
                    title={value}
                    filterValues={eachFilterValue}
                    onClick={handleOpenFilterModal}
                  />
                );
              } else {
                return (
                  <Badges
                    key={value}
                    title={value}
                    filterValues={eachFilterValue}
                    onClick={handleFilterBadgeClick}
                  />
                );
              }
            })}
          </section>
        )}

        <section className="news-list">
          {newsData.map((obj: NewsData): undefined | JSX.Element => {
            if (obj.title === "[Removed]") return undefined;
            if (selectedSourceTab && obj.api === selectedSourceTab) return <NewsCard key={obj.title} cardData={obj} />;
            if (!selectedSourceTab) return <NewsCard key={obj.title} cardData={obj} />;
            return undefined;
          })}
        </section>

        <FilterComp handleOpenFilterModal={handleOpenFilterModal} />
      </article>
      <FilterModal
        categories={categories}
        sources={sources}
        authors={authors}
        show={isFilterModalOpen}
        handleClose={handleCloseFilterModal}
        initialData={initialFilterValues}
        handleSubmit={handleSubmitFilterData}
      />
    </main>
  );
};

export default Home;