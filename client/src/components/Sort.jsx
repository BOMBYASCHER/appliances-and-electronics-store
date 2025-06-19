import { 
  sortByNameAsc,
  sortByNameDesc,
  sortByPriceAsc,
  sortByPriceDesc,
  sortByReleaseDateAsc,
  sortByReleaseDateDesc
} from '../SortFunctions.js';
import Search from './Search.jsx';
import '../assets/style/style.css';

const Sort = ({ setSort }) => {
  const defaultSort = (products) => products;

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
    <div className='search-container'>
      <Search/>
      <select defaultValue={0} onChange={e => handleSort(e)} className="sort-select">
        <option value={0} >По умолчанию</option>
        <option value={1} >Цена: от низкой к высокой</option>
        <option value={2} >Цена: от высокой к низкой</option>
        <option value={3} >По алфавиту: A-Z</option>
        <option value={4} >По алфавиту: Z-A</option>
        <option value={5} >Год выпуска: от новых к старым</option>
        <option value={6} >Год выпуска: от старых к новым</option>
      </select>
    </div>
  );
};

export default Sort;
