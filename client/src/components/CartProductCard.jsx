import cn from 'classnames';
import { useDeleteProductFromCartMutation, useUpdateProductInCartMutation } from '../slices/api/cartApi';

const CartProductCard = ({ productId, title, price, image, isFavorite, quantity }) => {
  const [changeQuantity] = useUpdateProductInCartMutation();
  const [deleteProduct] = useDeleteProductFromCartMutation();

  const btnDecreaseQuantity = cn('btn', {
    'btn-primary': quantity > 1,
    'btn-secondary': quantity == 1
  });
  const btnIncreaseQuantity = cn('btn', 'btn-primary');

  const handleBtnDecrease = () => {
    if (quantity - 1 > 0) {
      changeQuantity({ productId, quantity: quantity - 1 });
    }
  };
  const handleBtnIncrease = () => {
    changeQuantity({ productId, quantity: quantity + 1 });
  };

  return (
    <div className="row g-0 border rounded">
      <div className="col p-4 d-flex flex-column position-static justify-content-between">
        <h3>{title}</h3>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='row row-cols-auto'>
            <div className='col'>
              <button className={btnDecreaseQuantity} onClick={handleBtnDecrease}>-</button>
            </div>
            <div className='col-3'>
              <input className="form-control" type='number' value={quantity} disabled={true}></input>
            </div>
            <div className='col'>
              <button className={btnIncreaseQuantity} onClick={handleBtnIncrease}>+</button>
            </div>
          </div>
          <h2 className='text-end'>{price}</h2>
        </div>
      </div>
      <div className="col-3 d-none d-lg-block">
        <img width={'auto'} height={200} src={image} alt="Product image" />
      </div>
      <div className="col-auto d-flex">
        <button className="btn btn-danger" onClick={() => deleteProduct({ productId })}>X</button>
      </div>
    </div>
  );
};

export default CartProductCard;