import CartProductCard from "../components/CartProductCard";
import { useSelector } from "react-redux";
import Header from '../components/Header.jsx';
import { useGetCartQuery } from '../slices/api/cartApi.js';

const Cart = () => {
  const { data } = useGetCartQuery();
  const { totalAmount, products } = useSelector((state) => state.cart);
  console.log('products size: ' + products.length)
  console.log(products)
  return (
    <>
    <Header/>
    <div className='container'>
        {products.map(({ id, productId, title, price, image, quantity }) =>
          <CartProductCard
            key={id}
            productId={productId}
            title={title}
            price={price}
            image={image}
            quantity={quantity}
          />
        )}
        <form>
          <h2>{totalAmount}</h2>
          <button type='submit' className='btn btn-primary'>Order</button>
        </form>
    </div>
    </>
  )
}

export default Cart;
