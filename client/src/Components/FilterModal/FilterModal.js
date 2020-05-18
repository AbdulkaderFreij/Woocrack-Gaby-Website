import React, { useRef } from 'react';
import useOnclickOutside from 'react-cool-onclickoutside';

import './FilterModal.scss';

const FilterModel = ({hideFilterModel, years = [], handleYearFilter, selectedYear, handleSearchQueryChange, handleSearchSubmit}) => {
  const ref = useRef();
  
  useOnclickOutside(ref, () => {
    hideFilterModel();
  });
  return (
      <div className="filter-model" ref={ref}>
        
        <h2>Filter</h2>
        
        <div className="year-filter">
          {selectedYear}
          <select value={selectedYear} onChange={(event => {
            handleYearFilter(event.target.value)
          })}>
            <option value="-1">--- Select a year ---</option>
            {
              years.map(year => {
                return <option key={year} value={year}>{year}</option>
              })
            }
          </select>
          
          <div>
            <form onSubmit={event => {
              event.preventDefault();
              handleSearchSubmit()
            }}>
              <input type="search" onChange={event => {
                handleSearchQueryChange(event.target.value);
              }}/>
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      </div>
  )
  
}


export default FilterModel;
