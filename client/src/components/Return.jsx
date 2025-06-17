import cn from 'classnames';
import { useState } from "react";

const Return = ({ orderTitle, productTitle, image, totalAmount, price, quantity, date, reason, photo }) => {
  const [isShown, setIsShown] = useState(false);
  
  const toggleAccordion = () => {
    setIsShown(!isShown);
  };

  const accordionBtnClass = cn('accordion-button', {
    collapsed: !isShown,
  });
  const accordionClass = cn('accordion-collapse collapse', {
    show: isShown,
  });
  const { data: photoData, type: photoType } = photo;
  const src = `data:${photoType};base64,${photoData}`;

  const accordionIsShown = src === 'data:application/octet-stream;base64,';

  return (
    <div className="row-md-6">
    <div class="col">
      <div class="card">
        <div class="row g-0">
          <div class="col-md-8">
            <div class="card-body">
              <p class="card-title fs-4">Вернитесь за <strong>{productTitle}</strong></p>
              <p class="card-title fs-5">Из заказа <strong>{orderTitle}</strong></p>
              <p class="card-text text-body-secondary">Возврат осуществлён {new Date(date).toLocaleDateString()}</p>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <div class="d-flex justify-content-between">
                    <p>Итоговая сумма покупки:</p>
                    <p>{totalAmount}</p>
                  </div>
                </li>
                <li class="list-group-item">
                  <div class="d-flex justify-content-between">
                    <p>Цена продукта:</p>
                    <p>{price}</p>
                  </div>
                </li>
                <li class="list-group-item">
                  <div class="d-flex justify-content-between">
                    <p>Количество:</p>
                    <p>{quantity}</p>
                  </div>
                </li>
                <li class="list-group-item">
                  <div class="d-flex justify-content-between">
                    <p>Причина возврата:</p>
                    <p>{reason}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-4">
            <img width='100%' height='auto' src={image}/>
          </div>
          {
            accordionIsShown ?
            null :
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button onClick={toggleAccordion} className={accordionBtnClass} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded={isShown} aria-controls="collapseOne">
                    Фото возврата
                  </button>
                </h2>
                <div id="collapseOne" className={accordionClass} data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <div className='row row-cols-sm-3 row-cols-md-6 g-3'>
                      <img src={src}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
    </div>
  );
};

export default Return;
