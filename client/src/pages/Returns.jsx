import { Link } from "react-router";
import Header from "../components/Header";
import Return from "../components/Return";
import { useGetReturnsQuery } from "../slices/api/returnsApi";
import Footer from "../components/Footer";
import style from '../assets/style/Returns.css?inline';

const Returns = () => {
  const { data: returns = [] } = useGetReturnsQuery();

  return (
    <>
    <style type='text/css'>{style}</style>
    <Header/>
      {
        returns.length == 0 ?
        <EmptyHero/> :
        <>
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
        </>
      }
    <Footer/>
    </>
  );
};

const EmptyHero = () => {
  return (
    <></>
    // <div class="px-4 py-5 my-5 text-center">
    //   <h1 class="display-5 fw-bold">Возвратов нет.</h1>
    //   <div class="col-lg-6 mx-auto">
    //   <p class="lead mb-4">
    //     Вы еще не сделали никаких возвратов. Вы можете просмотреть свои заказы.
    //   </p>
    //   <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
    //     <Link to='/orders'>
    //       <button type="button" class="btn btn-primary btn-lg px-4 gap-3">Заказы</button>
    //     </Link>
    //   </div>
    //   </div>
    // </div>
  );
};


export default Returns;
