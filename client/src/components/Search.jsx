import Filter from '../Filter';
import { useState } from 'react';
import '../assets/style/style.css';

const Search = ({ filter, setFilter }) => {
  const [searchString, setSearchString] = useState('');

  const onEnterPress = ({ key }) => {
    if (key === 'enter') {
      const newFilter = new Filter(filter);
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
      onKeyUp={(e) => onEnterPress(e)}
    />
  );
};

export default Search;