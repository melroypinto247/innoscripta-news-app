import React from 'react'
import './shared.css'

interface FilterCompProps {
  handleOpenFilterModal: () => void; // Function type
}

const FilterComp:React.FC<FilterCompProps> = ({handleOpenFilterModal}) => {
  return (
    <div className='iconWrapper' title='Filter' onClick={handleOpenFilterModal}>
      <img src='/assets/images/filter.png' alt='filter-icon' width={20} height={20}/>
    </div>
  )
}

export default FilterComp