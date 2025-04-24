import { addToCart, addToFavorite, deleteFromCart, deleteFromFavorite } from '../ProductsContext.jsx';

const FavoriteCard = ({ productId, title, description, price, image, isInCart }) => {
  const dispatch = useProductsDispatch();

  const [isAddedToFavorite, setIsAddedToFavorite] = useState(true);
  const [isAddedToCart, setIsAddedToCart] = useState(isInCart);

  const btnFavorite = cn('btn', 'btn-favorite', {
    active: isAddedToFavorite
  });
  const btnCart = cn('btn', 'btn-cart', {
    active: isAddedToCart
  });

  const handleBtnFavorite = () => {
    if (isAddedToCart) {
      dispatch(deleteFromFavorite(productId))
      setIsAddedToFavorite(false);
    } else if (!isAddedToCart) {
      dispatch(addToFavorite(productId))
      setIsAddedToFavorite(true);
    }
  };
  const handleBtnCart = () => {
    if (isAddedToCart) {
      dispatch(deleteFromCart(productId))
      setIsAddedToCart(false);
    } else if (!isAddedToCart) {
      dispatch(addToCart(productId))
      setIsAddedToCart(true);
    }
  };

  return (
    <div>
      <div>
        <img src={image} alt="Product image" />
      </div>
      <h1>{title}</h1>
      <p>{description}</p>
      <h2>{price}</h2>
      <button className={btnFavorite} onClick={handleBtnFavorite}>To Favorites</button>
      <button className={btnCart} onClick={handleBtnCart}>To Cart</button>
    </div>
  );
};

export default FavoriteCard;
