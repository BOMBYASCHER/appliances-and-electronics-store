import cn from 'classnames';
import { 
  sortByNameAsc,
  sortByNameDesc,
  sortByPriceAsc,
  sortByPriceDesc,
  sortByReleaseDateAsc,
  sortByReleaseDateDesc
} from '../SortFunctions.js';

const Sort = ({ setSort }) => {
  const defaultSort = (products) => products;
  const selectSortClassName = cn('form-select');

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
