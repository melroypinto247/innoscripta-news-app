import React from 'react';
import "./layout.css"

interface PropsType{
  handleSearch:(event:React.ChangeEvent<HTMLInputElement>)=>void;
}

const Header:React.FC<PropsType> = ({handleSearch}) => {
  return (
    <header>
    <section className='navigation'>
    <nav >
        <div className='logo-section'>
            <div className='logo'>News</div>
            <div className='logo-text'>Innoscripta-News</div>
        </div>
      </nav>
      <section className='search-section'>
        <form>
            <label>search by articles...</label>
            <span className='elements-wrapper'>
                <input placeholder='' type='text' onChange={handleSearch} />
            </span>
            
        </form>
      </section>
    </section>
      
    </header>
  )
}

export default Header