import React from 'react';
import { NewsData } from '../../pages/Home';
import "./home.css"
import dayjs from 'dayjs';

const NewsCard:React.FC<{cardData:NewsData}> = ({cardData}) => {
  return (
    <div className='news-container'>
        <div className='image-wrapper'>
            <div className='date-wrapper'>Published on: {dayjs(cardData.publishedAt).format('DD/MM/YYYY') }</div>
            <img loading='lazy' className='image' src={cardData?.urlToImage || ''} alt={cardData?.author + " news image"}/>
        </div>
        <div className='title'>{cardData?.title}</div>
        <div className='description'>{cardData?.description}</div>
        <div className='readmore'><a href={cardData?.url}>Read More</a></div>
        <div className='publisher-info'>
            <div className='author'><label>Author:</label>{cardData?.author}</div>
            <div className='source'><label>Source:</label>{cardData?.source?.name}</div>
        </div>
    </div>
  )
}

export default NewsCard