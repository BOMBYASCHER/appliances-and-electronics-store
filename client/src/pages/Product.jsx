import { useAddFavoriteMutation, useDeleteFavoriteMutation } from '../slices/api/favoritesApi';
import { useAddProductToCartMutation, useDeleteProductFromCartMutation } from '../slices/api/cartApi';
import { useGetProductByIdMutation } from '../slices/api/productsApi';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import '../assets/style/product-page.css';
import '../assets/style/style.css';

const Product = () => {
  const { id } = useParams();
  const [
    getProductById,
    { data, isSuccess },
  ] = useGetProductByIdMutation();
  useEffect(() => {
    getProductById({ id });
  }, []);
  const [product, setProduct] = useState({
    brand: '', 
    title: '', 
    description: '', 
    price: '', image: '',
    isFavorite: false,
    isInCart: false
  });
  useEffect(() => {
    if (isSuccess) {
      console.log( 'in')
      setProduct(data);
    }
  }, [isSuccess]);
  const { brand, title, description, price, image, isFavorite, isInCart } = product;
  console.log(data)
  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();
  const [addToCart] = useAddProductToCartMutation();
  const [deleteFromCart] = useDeleteProductFromCartMutation();

  const handleBtnFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      deleteFavorite(id);
    } else if (!isFavorite) {
      addFavorite({ productId: id, title, description, price, image, isFavorite, isInCart });
    }
  };

  const handleBtnCart = (e) => {
    e.stopPropagation();
    if (isInCart) {
      deleteFromCart(id);
    } else if (!isInCart) {
      addToCart({ productId: id, title, price, image });
    }
  };

  return (
    <div className="container">
      <div className="product-image">
        <img src={image} alt="Изображение товара" />
      </div>
      <div className="product-info">
        <h1 className="product-title">{title}</h1>
        <h2 className="brand">{brand}</h2>
        <p className="price">{price}</p>
        <p className="description">{description}</p>
        <div className="buttons">
          <button className="add-to-cart" onClick={handleBtnCart}>Добавить в корзину</button>
          <button className="add-to-favorites" onClick={handleBtnFavorite}>Добавить в избранное</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
