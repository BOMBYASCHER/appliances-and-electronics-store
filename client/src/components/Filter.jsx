import cn from 'classnames';

import { useState, useEffect } from 'react';
import FilterObject from '../Filter.js';

const Filter = ({ data, filter, setFilter }) => {
  const checkboxClassName = cn('col');
  const { brands, categories, colors, releaseYears, minPrice, maxPrice } = data;

  return (
    <div className='col-md-4'>
      <div className='position-sticky' style={{top: 2 + 'rem'}}>
        <div className='border rounded p-3 mb-2'>
          <p className='fs-5'>Категория</p>
          <div className={checkboxClassName}>
            <Categories categories={categories} filter={filter} setFilter={setFilter}/>
          </div>
        </div>
        <div className='border rounded p-3 mb-2'>
          <p className='fs-5'>Бренд</p>
          <div className={checkboxClassName}>
            <Brands brands={brands} filter={filter} setFilter={setFilter}/>
          </div>
        </div>
        <div className='border rounded p-3 mb-2'>
          <p className='fs-5'>Цена</p>
          <div className={checkboxClassName}>
            <PriceRange minPrice={minPrice} maxPrice={maxPrice} filter={filter} setFilter={setFilter} />
          </div>
        </div>
        <div className='border rounded p-3 mb-2'>
          <p className='fs-5'>Цвет</p>
          <div className={checkboxClassName}>
            <Colors colors={colors} filter={filter} setFilter={setFilter}/>
          </div>
        </div>
        <div className='border rounded p-3 mb-2'>
          <p className='fs-5'>Год выпуска</p>
          <div className={checkboxClassName}>
            <ReleaseYears years={releaseYears} filter={filter} setFilter={setFilter}/>
          </div>
        </div>
      </div>
    </div>
  )
};

const Brands = ({ brands, filter, setFilter }) => {
  const [checkedBrands, setCheckedBrands] = useState([]);

  useEffect(() => {
    const newFilter = new FilterObject(filter);
    newFilter.brands = checkedBrands;
    setFilter(newFilter);
  }, [checkedBrands]);

  const handleBrandCheckbox = ({ target: { checked } }, brand) => {
    if (checked) {
      setCheckedBrands(checkedBrands.concat(brand));
    } else {
      setCheckedBrands(checkedBrands.filter(b => b !== brand));
    }
  };

  return (brands.sort().map((brand, index) => 
    <div key={index} className='row'>
      <label id={index}>
        <input className='form-check-input' type='checkbox' name={brand} onChange={(e) => handleBrandCheckbox(e, brand)}/>
        {" " + brand}
      </label>
    </div>
  ));
};

const Colors = ({ colors, filter, setFilter }) => {
  const [checkedColors, setCheckedColors] = useState([]);

  useEffect(() => {
    const newFilter = new FilterObject(filter);
    newFilter.colors = checkedColors;
    setFilter(newFilter);
  }, [checkedColors]);

  const handleColorCheckbox = ({ target: { checked } }, color) => {
    if (checked) {
      setCheckedColors(checkedColors.concat(color));
    } else {
      setCheckedColors(checkedColors.filter(c => c !== color));
    }
  };
  return (colors.map((color, index) =>
    <div key={index} className='row'>
      <label id={index}>
        <input className='form-check-input' type='checkbox' name={color} onChange={(e) => handleColorCheckbox(e, color)}/>
        {" " + color}
      </label>
    </div>
  ));
};

const Categories = ({ categories, filter, setFilter }) => {
  const [checkedCategory, setCheckedCategory] = useState(null);

  useEffect(() => {
    const newFilter = new FilterObject(filter);
    newFilter.category = checkedCategory;
    setFilter(newFilter);
  }, [checkedCategory]);

  const handleCategoryCheckbox = (category) => {
    setCheckedCategory(category);
  };

  return (categories.map((category, index) =>
    <div key={index} className='row'>
      <label id={index}>
        <input className='form-check-input'
          checked={checkedCategory === category}
          type='radio'
          name={category}
          onChange={() => handleCategoryCheckbox(category)}
        />
        {" " + category}
      </label>
    </div>
  ));
};

const ReleaseYears = ({ years, filter, setFilter }) => {
  const [checkedReleaseYears, setCheckedReleaseYears] = useState([]);

  useEffect(() => {
    const newFilter = new FilterObject(filter);
    newFilter.releaseYears = checkedReleaseYears;
    setFilter(newFilter);
  }, [checkedReleaseYears]);

  const handleReleaseYearCheckbox = ({ target: { checked } }, year) => {
    if (checked) {
      setCheckedReleaseYears(checkedReleaseYears.concat(year));
    } else {
      setCheckedReleaseYears(checkedReleaseYears.filter(y => y !== year));
    }
  };

  return (years.sort((a, b) => b - a).map((year, index) =>
    <div key={index} className='row'>
      <label id={index}>
        <input className='form-check-input' type='checkbox' name={year} onChange={(e) => handleReleaseYearCheckbox(e, year)}/>
        {" " + year}
      </label> 
    </div>
  ));
};

const PriceRange = ({ minPrice, maxPrice, filter, setFilter }) => {
  const [currentMinPrice, setCurrentMinPrice] = useState(minPrice);
  const [currentMaxPrice, setCurrentMaxPrice] = useState(maxPrice);
  const [tempMinPrice, setTempMinPrice] = useState();
  const [tempMaxPrice, setTempMaxPrice] = useState();
  
  useEffect(() => {
    const newFilter = new FilterObject(filter);
    newFilter.minPrice = currentMinPrice;
    newFilter.maxPrice = currentMaxPrice;
    setFilter(newFilter);
  }, [currentMinPrice, currentMaxPrice]);

  const handleMinPrice = ({ target: { value } }) => {
    setTempMinPrice(value);
    setCurrentMinPrice(value);
  };

  const handleMaxPrice = ({ target: { value } }) => {
    setTempMaxPrice(value);
    setCurrentMaxPrice(value);
  };

  const handleMinPriceRange = ({ target: { value } }) => {
    if (value < minPrice) {
      setTempMinPrice(minPrice);
    } else if (value > currentMaxPrice) {
      setTempMinPrice(tempMaxPrice);
    } else {
      setTempMinPrice(value);
    }
  };

  const handleMaxPriceRange = ({ target: { value } }) => {
    if (value > maxPrice) {
      setTempMaxPrice(maxPrice);
    } else if (value < currentMinPrice) {
      setTempMaxPrice(tempMinPrice);
    } else {
      setTempMaxPrice(value);
    }
  };

  const handleSliderRelease = () => {
    setCurrentMinPrice(tempMinPrice);
    setCurrentMaxPrice(tempMaxPrice);
  };
 
  return (
    <div className="price">
      <label>
        <input
          type="range"
          className="form-range min range-input"
          value={tempMinPrice ? tempMinPrice : minPrice}
          min={minPrice}
          max={maxPrice}
          onChange={e => handleMinPriceRange(e)}
          onMouseUp={handleSliderRelease}
        />
      </label>
      <label>
        <input
          type="range"
          className="form-range max range-input"
          value={tempMaxPrice ? tempMaxPrice : maxPrice}
          min={minPrice}
          max={maxPrice}
          onChange={e => handleMaxPriceRange(e)}
          onMouseUp={handleSliderRelease}
        />
      </label>
      <input
        type='number'
        className="form-control min input"
        value={tempMinPrice}
        placeholder={minPrice}
        min={minPrice}
        max={maxPrice}
        onChange={e => handleMinPrice(e)}
      />
      <input
        type='number'
        className="form-control max input"
        value={tempMaxPrice}
        placeholder={maxPrice}
        min={minPrice}
        max={maxPrice}
        onChange={e => handleMaxPrice(e)}
      />
    </div>
  );
};

export default Filter;
