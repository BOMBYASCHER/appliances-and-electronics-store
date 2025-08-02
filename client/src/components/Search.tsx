import cn from 'classnames';
import Filter from '../Filter';
import { useState } from 'react';

const Search = ({ filter, setFilter }) => {
  const [searchString, setSearchString] = useState('');

  const inputSearchClassName = cn('input-group');

  const onInput = (s) => {
    const newFilter = new Filter(filter);
    newFilter.search = s;
    setFilter(newFilter);
  }

  return (
    <div className={inputSearchClassName}>
      <input
        className='form-control'
        type='search'
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
        placeholder='Поиск...'
      />
      <button className='btn btn-secondary' onClick={() => onInput(searchString)}>Найти</button>
    </div>
  );
};

export default Search;