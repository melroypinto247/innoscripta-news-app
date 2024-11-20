import React from 'react';
import './home.css';

const Badges:React.FC<{title:string,filterValues:string | string[],onClick:()=>void}> = ({title,filterValues,onClick}) => {

  const makeStrFromArr=(arr:string[]):string=>{
    let str="";
    arr.forEach((element:string,index) => {
      !index?str+=element:str+=`, ${element}`
      
    });
    return str;
  }

  return (
    <div className='badge-wrapper' onClick={onClick} >
      <text className='text-wrapper'>
       <b>{title}:</b>  {!Array.isArray(filterValues)?filterValues:makeStrFromArr(filterValues)}
      </text>
    </div>
  )
}

export default Badges