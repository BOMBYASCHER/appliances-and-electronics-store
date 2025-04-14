import cn from 'classnames';
import { 
  sortByNameAsc,
  sortByNameDesc,
  sortByPriceAsc,
  sortByPriceDesc,
  sortByReleaseDateAsc,
  sortByReleaseDateDesc
} from '../SortFunctions.js';

const Sort = ({ defaultSort = (data) => data, setSort }) => {
  const selectSortClassName = cn('select-sort');

  return (
    <select className={selectSortClassName}>
      <option onClick={() => setSort(defaultSort)}>By default</option>
      <option onClick={() => setSort(sortByPriceAsc)}>Price: Low to High</option>
      <option onClick={() => setSort(sortByPriceDesc)}>Price: High to Low</option>
      <option onClick={() => setSort(sortByNameAsc)}>Name: A-Z</option>
      <option onClick={() => setSort(sortByNameDesc)}>Name: Z-A</option>
      <option onClick={() => setSort(sortByReleaseDateAsc)}>Release date: New to Old</option>
      <option onClick={() => setSort(sortByReleaseDateDesc)}>Release date: Old to New</option>
    </select>
  );
};

export default Sort;
