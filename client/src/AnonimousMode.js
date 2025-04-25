import { useContext } from "react"
import { addToCart, addToFavorite, deleteFromCart, deleteFromFavorite, ProductsDispatchContext } from "./ProductsContext";


export default function Anonimous() {
  const dispatch = useContext(ProductsDispatchContext);
  return ({
    addToCart: (productId) => dispatch(addToCart(productId)),

    addToFavorites: (productId) => dispatch(addToFavorite(productId)),

    deleteFromCart: (productId) => dispatch(deleteFromCart(productId)),
    
    deleteFromFavorites: (productId) => dispatch(deleteFromFavorite(productId))
  })
};