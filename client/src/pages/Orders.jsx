import { useSelector } from "react-redux";
import Header from "../components/Header";
import { getOrders } from "../stateSelectors";
import Order from "../components/Order";
import { useGetOrdersQuery } from "../slices/api/ordersApi";

const Orders = () => {
  const { data: orders = [] } = useGetOrdersQuery();

  return (
    <>
    <Header/>
    <div className='container'>
      <h1>Orders page</h1>
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
    </div>
    </>
  );
};

export default Orders;
