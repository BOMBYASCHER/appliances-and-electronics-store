import { useState } from "react";
import { Link } from 'react-router';

const Order = ({ id: orderId, title: orderTitle, totalAmount, date, purchases, status }) => {
  const [isShown, setIsShown] = useState(false);
  
  const toggleAccordion = () => {
    console.log('click')
    console.log(isShown)
    setIsShown(!isShown);
  };

  return (
    <div key={orderId} className="order-container">
      <div className="order-header">
        <h1>{orderTitle}</h1>
        <p>Общая сумма: {totalAmount}</p>
        <p>Дата заказа: {new Date(date).toLocaleDateString()}</p>
        <p>Статус: {status}</p>
      </div>
      <div className="purchase-header" onClick={toggleAccordion}>
        Покупки
      </div>
      <div className="purchase-content" style={{ display: isShown ? 'block' : 'none' }}>
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
  );
};

const Purchase = ({ title, price, image, quantity, formInfo, isReturned }) => {
  const returnBlock = isReturned ?
    <p>Покупка возвращена</p> :
    <Link state={formInfo} to='/return-form'>
      <button disabled={isReturned} className='return-button'>Вернуть</button>
    </Link>
  return (
    <div className='purchase-details'>
      <img alt="Product image" src={image} />
      <div>
        <p><strong>{title}</strong></p>
        <p>Количество: {quantity} Цена: {price}</p>
        {returnBlock}
      </div>
    </div>
  );
};

export default Order;
