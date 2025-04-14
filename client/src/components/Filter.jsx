import cn from 'classnames';

import { useState, useEffect } from 'react';
import FilterObject from '../Filter.js';

const Filter = ({ data, filter, setFilter }) => {
  const filterClassName = cn('filter');
  const checkboxClassName = cn('select-filter');

  const { brands, categories, colors, releaseYears, minPrice, maxPrice } = data;

  return (
    <div className={filterClassName}>
      <p>Brand</p>
      <div className={checkboxClassName}>
        <Brands brands={brands} filter={filter} setFilter={setFilter}/>
      </div>
      <p>Categories</p>
      <div className={checkboxClassName}>
        <Categories categories={categories} filter={filter} setFilter={setFilter}/>
      </div>
      <p>Price</p>
      <div className={checkboxClassName}>
        <PriceRange minPrice={minPrice} maxPrice={maxPrice} filter={filter} setFilter={setFilter} />
      </div>
      <p>Color</p>
      <div className={checkboxClassName}>
        <Colors colors={colors} filter={filter} setFilter={setFilter}/>
      </div>
      <p>Release year</p>
      <div className={checkboxClassName}>
        <ReleaseYears years={releaseYears} filter={filter} setFilter={setFilter}/>
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

  return (
    <>
    {brands.map((brand, index) => 
      <label id={index}>
        {brand}
        <input type='checkbox' name={brand} onChange={(e) => handleBrandCheckbox(e, brand)}/>
      </label>
    )}
    </>
  );
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
  return (
    <>
    {colors.map((color, index)=> 
      <label id={index}>
        {color}
        <input type='checkbox' name={color} onChange={(e) => handleColorCheckbox(e, color)}/>
      </label>
    )}
    </>
  );
};

const Categories = ({ categories, filter, setFilter }) => {
  const [checkedCategories, setCheckedCategories] = useState([]);

  useEffect(() => {
    const newFilter = new FilterObject(filter);
    newFilter.categories = checkedCategories;
    setFilter(newFilter);
  }, [checkedCategories]);

  const handleCategoryCheckbox = ({ target: { checked } }, category) => {
    if (checked) {
      setCheckedCategories(checkedCategories.concat(category));
    } else {
      setCheckedCategories(checkedCategories.filter(c => c !== category));
    }

  };
  return (
    <>
    {categories.map((category, index) => 
      <label id={index}>
        {category}
        <input type='checkbox' name={category} onChange={(e) => handleCategoryCheckbox(e, category)}/>
      </label>
    )}
    </>
  );
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

  return (
    <>
    {years.map((year, index) => 
      <label id={index}>
        {year}
        <input type='checkbox' name={year} onChange={(e) => handleReleaseYearCheckbox(e, year)}/>
      </label>
    )}
    </>
  );
};

const PriceRange = ({ minPrice, maxPrice, filter, setFilter }) => {
  const [currentMinPrice, setCurrentMinPrice] = useState(minPrice);
  const [currentMaxPrice, setCurrentMaxPrice] = useState(maxPrice);
  useEffect(() => {
    const newFilter = new FilterObject(filter);
    newFilter.minPrice = currentMinPrice;
    newFilter.maxPrice = currentMaxPrice;
    setFilter(newFilter);
  }, [currentMinPrice, currentMaxPrice]);

 
  return (
    <div className="price">
      Price:
      <label>
        <input
          type="range"
          className="min range-input"
          value={currentMinPrice}
          min={minPrice}
          max={maxPrice}
          onChange={e => setCurrentMinPrice(e.target.value)}
        />
      </label>
      <label>
        <input
          type="range"
          className="max range-input"
          value={currentMaxPrice}
          min={minPrice}
          max={maxPrice}
          onChange={e => setCurrentMaxPrice(e.target.value)}
        />
      </label>
      {/* <input
        type='number'
        className="min input"
        value={currentMinPrice}
        placeholder={minPrice}
        min={minPrice}
        max={maxPrice}
        onChange={e => setCurrentMinPrice(e.target.value)}
      />
      <input
        type='number'
        className="max input"
        value={currentMaxPrice}
        placeholder={maxPrice}
        min={minPrice}
        max={maxPrice}
        onChange={e => setCurrentMaxPrice(e.target.value)}
      /> */}
    </div>
  );
};

export default Filter;