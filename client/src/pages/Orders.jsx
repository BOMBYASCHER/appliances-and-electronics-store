import { Link } from "react-router";
import Header from "../components/Header";
import Order from "../components/Order";
import { useGetOrdersQuery } from "../slices/api/ordersApi";

const Orders = () => {
  const { data: orders = [] } = useGetOrdersQuery(null, { pollingInterval: 1000, skipPollingIfUnfocused: true });

  return (
    <>
    <Header/>
    <div className='container'>
      {
        orders.length == 0 ?
        <EmptyHero/> :
        <>
        <h1 className='pb-4'>Your orders</h1>
        {orders.map(({ id, title, totalAmount, date, purchases, status }) => {
          return (<Order
            id={id}
            title={title}
            totalAmount={totalAmount}
            date={date}
            purchases={purchases}
            status={status}
          />)
        })}
        </>
      }
    </div>
    </>
  );
};

const EmptyHero = () => {
  return (
    <div class="px-4 py-5 my-5 text-center">
      <h1 class="display-5 fw-bold">The orders is empty.</h1>
      <div class="col-lg-6 mx-auto">
      <p class="lead mb-4">
        You haven't placed any orders yet. You can place your order on the cart page or view the product catalog.
      </p>
      <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
        <Link to='/cart'>
          <button type="button" class="btn btn-primary btn-lg px-4 gap-3">Cart</button>
        </Link>
        <Link to='/'>
          <button type="button" class="btn btn-outline-secondary btn-lg px-4">Catalog</button>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default Orders;
