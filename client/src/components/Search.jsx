import cn from 'classnames';
import Filter from '../Filter';
import { useState } from 'react';

const Search = ({ filter, setFilter }) => {
  const [searchString, setSearchString] = useState('');

  const inputSearchClassName = cn('search');

  const onInput = (s) => {
    const newFilter = new Filter(filter);
    newFilter.search = s;
    setFilter(newFilter);
  }

  return (
    <div className={inputSearchClassName}>
      <input type='search' value={searchString} onChange={(e) => setSearchString(e.target.value)}/>
      <button onClick={() => onInput(searchString)}></button>
    </div>
  );
};

export default Search;