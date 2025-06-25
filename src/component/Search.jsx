import React from 'react';

const Search = ({searchText,setSearchText}) => {
  return (
      <div className="search">
          <div className="">
              <img src="search.svg" alt="search"/>

              <input
                  type ="text"
                  placeholder="Search..."
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  />
          </div>
      </div>

  )
}

export default Search;
