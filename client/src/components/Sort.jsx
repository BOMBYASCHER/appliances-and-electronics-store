import cn from 'classnames';
import { 
  sortByNameAsc,
  sortByNameDesc,
  sortByPriceAsc,
  sortByPriceDesc,
  sortByReleaseDateAsc,
  sortByReleaseDateDesc
} from '../SortFunctions.js';
import { useState, useEffect } from 'react';

const Sort = ({ defaultSort = (data) => data, setSort }) => {
  // const [sortNumber, setSortNumber] = useState(0);

  // useEffect(() => {
  //   if (sortNumber == 0) { setSort(defaultSort) }
  //   if (sortNumber == 1) { setSort(sortByPriceAsc) }
  //   if (sortNumber == 2) { setSort(sortByPriceDesc) }
  //   if (sortNumber == 3) { setSort(sortByNameAsc) }
  //   if (sortNumber == 4) { setSort(sortByNameDesc) }
  //   if (sortNumber == 5) { setSort(sortByReleaseDateAsc) }
  //   if (sortNumber == 6) { setSort(sortByReleaseDateDesc) }
  // }, [sortNumber]);

  const selectSortClassName = cn('select-sort');

  const handleSort = ({ target: { value } }) => {
    if (value == 0) { setSort(() => defaultSort) }
    if (value == 1) { setSort(() => sortByPriceAsc) }
    if (value == 2) { setSort(() => sortByPriceDesc) }
    if (value == 3) { setSort(() => sortByNameAsc) }
    if (value == 4) { setSort(() => sortByNameDesc) }
    if (value == 5) { setSort(() => sortByReleaseDateDesc) }
    if (value == 6) { setSort(() => sortByReleaseDateAsc) }
  };

  return (
    <select defaultValue={0} onChange={e => handleSort(e)} className={selectSortClassName}>
    {/* <select value={sortNumber} onChange={e => setSortNumber(e.target.value)} className={selectSortClassName}> */}
      <option value={0} >By default</option>
      <option value={1} >Price: Low to High</option>
      <option value={2} >Price: High to Low</option>
      <option value={3} >Name: A-Z</option>
      <option value={4} >Name: Z-A</option>
      <option value={5} >Release date: New to Old</option>
      <option value={6} >Release date: Old to New</option>
    </select>
  );
};

export default Sort;
