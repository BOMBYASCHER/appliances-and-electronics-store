import cn from 'classnames';
import { useDeleteProductFromCartMutation, useUpdateProductInCartMutation } from '../slices/api/cartApi';

const CartProductCard = ({ productId, title, price, image, isFavorite, quantity }) => {
  const [changeQuantity] = useUpdateProductInCartMutation();
  const [deleteProduct] = useDeleteProductFromCartMutation();

  const btnDecreaseQuantity = cn('btn-change', {
    // 'btn-primary': quantity > 1,
    // 'btn-secondary': quantity == 1
  });
  const btnIncreaseQuantity = cn('btn-change');

  const handleBtnDecrease = () => {
    if (quantity - 1 > 0) {
      changeQuantity({ productId, quantity: quantity - 1 });
    } else {
      deleteProduct({ productId });
    }
  };
  const handleBtnIncrease = () => {
    changeQuantity({ productId, quantity: quantity + 1 });
  };

  return (
    <tr>
      <img className="product-image" src={image} alt="Product image" />
      <td>{title}</td>
      <td>{price}</td>
      <td>
        <button className={btnDecreaseQuantity} onClick={handleBtnDecrease}>-</button>
        <input type="number" className="quantity-input" value={quantity} disabled={true} />
        <button className={btnIncreaseQuantity} onClick={handleBtnIncrease}>+</button>
      </td>
      <td>{quantity * price}</td>
    </tr>
  );
};

export default CartProductCard;
