import Header from "../components/Header";
import Return from "../components/Return";
import { useGetReturnsQuery } from "../slices/api/returnsApi";

const Returns = () => {
  const { data: returns = [] } = useGetReturnsQuery();

  return (
    <>
    <Header/>
    <div className='container'>
      <h1>Returns page</h1>
      <div>
        {returns.map(({ id, orderTitle, productTitle, image, totalAmount, price, quantity, date, reason, photo }) => (
          <Return
            key={id}
            orderTitle={orderTitle}
            productTitle={productTitle}
            image={image}
            totalAmount={totalAmount}
            price={price}
            quantity={quantity}
            date={date}
            reason={reason}
            photo={photo}
          />
      ))}
      </div>
    </div>
    </>
  );
};

export default Returns;
