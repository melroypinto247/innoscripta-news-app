import { NewsData } from "./pages/Home";

const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`;
const guardianApiUrl = `https://content.guardianapis.com/search?api-key=${process.env.REACT_APP_GUARDIAN_API_KEY}`;
const newYorkApiUrl = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${process.env.REACT_APP_NEW_YORK_API_KEY}`;

// combine data from 3 APIs
export const fetchNewsDataFromApis = async (): Promise<NewsData[]> => {
    const apiUrls = [
      newsApiUrl,
      guardianApiUrl,
      newYorkApiUrl
    ];
  
    try {
      // Fetch all API data concurrently
      const apiResponses = await Promise.all(apiUrls.map(url => fetch(url).then(res => res.json())));
      console.log(apiResponses,"response")
  
      // Process and combine the data from all APIs
      const combinedNewsData: NewsData[] = apiResponses.flatMap((apiData: any,promiseIndex) => {
        console.log(apiData,"response1234")

        const data = apiData.results || apiData.articles || apiData.response.results ||  [];
      console.log(data,"response123")


        return data?.map((article: any): NewsData | undefined => {
          // Normalize the API response into NewsData type
          return {
            category:article.type || "" ,
            api:promiseIndex===0 ?'News Api':promiseIndex===1?'Guardian Api':promiseIndex===2?'New York Api':"",
            source: {
              id: article.source?.id || article.id || null,
              name: article.source?.name || article.source || 'Unknown',
            },
            author: article.author|| article.byline || null,
            title: article.title||article.webTitle ,
            description: article.description || article.abstract ,
            url: article.url||article.webUrl||null,
            urlToImage: article.urlToImage || (Array.isArray(article.media) && article?.media[0] && article?.media[0]['media-metadata'][2].url) ||   '',
            
            publishedAt: article.publishedAt || article.webPublicationDate || article.published_date,
            content: article.content || null,
          };
        });
      });
  
      return combinedNewsData;
    } catch (error) {
      console.error('Error fetching news data:', error);
      return [];
    }
  };