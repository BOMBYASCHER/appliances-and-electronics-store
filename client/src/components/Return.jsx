import { useState } from "react";

const Return = ({ orderTitle, productTitle, image, totalAmount, price, quantity, date, reason, photo }) => {
  const [isShown, setIsShown] = useState(false);
  const { data: photoData, type: photoType } = photo;
  const src = `data:${photoType};base64,${photoData}`;
  const accordionIsShown = src === 'data:application/octet-stream;base64,';

  const toggleAccordion = () => {
    setIsShown(!isShown);
  };

  return (
    <div className="return-container">
      <div className="info">
        <h1 style={{fontSize: '1.5em', color: '#333'}}>Информация о возврате</h1>
        <p className="info-p">Номер заказа: <strong>{orderTitle}</strong></p>
        <p className="info-p">Дата возврата: <strong>{date}</strong></p>
        <p className="info-p">Название товара: <strong>{productTitle}</strong></p>
        <p className="info-p">Общая сумма покупки: <strong>{price * quantity}</strong></p>
        <p className="info-p">Цена товара: <strong>{price}</strong></p>
        <p className="info-p">Количество: <strong>{quantity}</strong></p>
        <div className="return-reason">
          <strong>Причина возврата: </strong>{reason}
        </div>
        {
          accordionIsShown ?
          null :
          <>
            <div className="toggle-button" onClick={toggleAccordion}>Посмотреть фотографию возврата</div>
            <div className="images-container" id="imageBlock" style={{ display: isShown ? 'flex' : 'none' }}>
              <img src={src} alt="Return photo" />
            </div>  
          </>
        }
      </div>
        <div className="product-image">
          <img src={image} alt="Product image" />
        </div>
    </div>
  );
};

export default Return;
