import FilterObject from '../Filter.js';
import { useState } from 'react';

const Search = ({ filter, setFilter }) => {
  const [searchString, setSearchString] = useState('');

  const onEnterPress = ({ key  }) => {
    if (key  === 'Enter') {
      const newFilter = new FilterObject(filter);
      newFilter.search = searchString;
      setFilter(newFilter);
    }
  }

  return (
    <input
      className='search-input'
      type='search'
      value={searchString}
      onChange={(e) => setSearchString(e.target.value)}
      placeholder='Поиск...'
      onKeyDown={(e) => onEnterPress(e)}
      onKeyUp={(e) => onEnterPress(e)}
    />
  );
};

export default Search;
