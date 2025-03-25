const ProductCard = (props) => {
  const { title, description, price, image } = props;
  return (
    <div>
      <div>
        <img src={image} alt="Product image" />
      </div>
      <h1>{title}</h1>
      <p>{description}</p>
      <h2>{price}</h2>
    </div>
  )
}

export default ProductCard;
