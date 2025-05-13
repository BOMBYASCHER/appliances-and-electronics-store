import cn from 'classnames';
import { useState } from "react";
import { Link } from 'react-router';

const Order = ({ id: orderId, title: orderTitle, totalAmount, date, purchases, status }) => {
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

  return (
    <div key={orderId} className="row-md-6">
    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div className="col p-4 d-flex flex-column position-static">
        <h4 className="pb-3 mb-0">{orderTitle}</h4>
        <p className="fs-5 mb-auto">Total amount: <strong>{totalAmount}</strong></p>
        <p className="fs-5 mb-auto">Date of order: <strong>{new Date(date).toLocaleDateString()}</strong></p>
        <p className="fs-5 mb-auto">Status: <strong>{status}</strong></p>
      </div>
      <div className="accordion" id="accordionExample">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button onClick={toggleAccordion} className={accordionBtnClass} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded={isShown} aria-controls="collapseOne">
            Purchases
          </button>
        </h2>
        <div id="collapseOne" className={accordionClass} data-bs-parent="#accordionExample">
          <div className="accordion-body">
            <div className='row row-cols-sm-3 row-cols-md-6 g-3'>
              {purchases.map(({ id, productId, title, price, image, quantity, isReturned }) => {
                const formInfo = { orderId, purchaseId: id, title, price, image, quantity, date, orderTitle };
                return (
                  <Purchase
                    key={id}
                    title={title}
                    price={price}
                    image={image}
                    quantity={quantity}
                    formInfo={formInfo}
                    isReturned={isReturned}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};

const Purchase = ({ title, price, image, quantity, formInfo, isReturned }) => {
  const returnBlock = isReturned ?
    <p>The purchase returned</p> :
    <Link state={formInfo} to='/return-form'>
      <button disabled={isReturned} className='btn btn-primary'>Return</button>
    </Link>
  return (
    <div className="col">
      <div className='card shadow-sm'>
        <div className='card-body'>
          <p className="fs-5">{title}</p>
          <div className='col-auto d-none d-lg-block'>
            <img width={'auto'} height={100} alt="Product image" src={image} />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p className="card-text fw-light">Quantity: {quantity}</p>
            <p className="">Price: {price}</p>
          </div>
          {returnBlock}
        </div>
      </div>
    </div>
  );
};

export default Order;
