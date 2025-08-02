import cn from 'classnames';

import { useState, useEffect } from 'react';
import FilterObject from '../Filter.js';

const Filter = ({ data, filter, setFilter }) => {
  const checkboxClassName = cn('col');
  const { brands, categories, colors, releaseYears, minPrice, maxPrice } = data;

  return (
    <div className='col-md-4'>
      <div style={{top: 2 + 'rem'}}>
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
        {" " + toLocalColorName(color)}
      </label>
    </div>
  ));
};

const toLocalColorName = (color) => {
  switch(color) {
    case 'white':
      return 'Белый';
    case 'black':
      return 'Чёрный';
    case 'silver':
      return 'Серебристый';
    case 'gray':
      return 'Серый';
    case 'metallic':
      return 'Металлик';
    case 'blue':
      return 'Синий';
    case 'yellow':
      return 'Жёлтый';
    case 'violet':
      return 'Фиолетовый';
  }
};

const Categories = ({ categories, filter, setFilter }) => {
  const [checkedCategory, setCheckedCategory] = useState(null);

  useEffect(() => {
    const newFilter = new FilterObject(filter);
    newFilter.category = checkedCategory;
    setFilter(newFilter);
  }, [checkedCategory]);

  const handleCategoryCheckbox = (category) => {
    if (checkedCategory === category) {
      setCheckedCategory(null);
    } else {
      setCheckedCategory(category);
    }
  };

  return (categories.map((category, index) =>
    <div key={index} className='row'>
      <label id={index}>
        <input className='form-check-input'
          checked={checkedCategory === category}
          type='radio'
          name={category}
          onClick={() => handleCategoryCheckbox(category)}
        />
        {" " + toLocalCategoryName(category)}
      </label>
    </div>
  ));
};

const toLocalCategoryName = (category) => {
  switch(category) {
    case 'washing machine':
      return 'Стиральные машины';
    case 'vacuum':
      return 'Пылесосы';
  }
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
    <div className="price d-grid">
      <div className='col'>
        <div className='row pb-4'>
          <label>
          Минимальная цена:
          <input
            type='number'
            className="form-control min input my-2"
            value={tempMinPrice}
            placeholder={minPrice}
            min={minPrice}
            max={maxPrice}
            onChange={e => handleMinPrice(e)}
          />
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
        </div>
        <div className='row'>
          <label>
          Максимальная цена:
          <input
            type='number'
            className="form-control max input my-2"
            value={tempMaxPrice}
            placeholder={maxPrice}
            min={minPrice}
            max={maxPrice}
            onChange={e => handleMaxPrice(e)}
          />
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
        </div>
      </div>
    </div>
  );
};

export default Filter;
