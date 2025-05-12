const Return = ({ orderTitle, productTitle, image, totalAmount, price, quantity, date, reason, photo }) => {
  const base64String = btoa(String.fromCharCode(...new Uint8Array(byteArray)));
  const src = `data:image/png;base64,${base64String}`;
  return (
    <div className="row-md-6">
    <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
      <div className="col p-4 d-flex flex-column position-static">
        <h3 className="mb-0">Order: {orderTitle}</h3>
        <p className="card-text mb-auto">{productTitle}</p>
        <h2>Total: {totalAmount}</h2>
        <h2>Price: {price}</h2>
      </div>
      <div className="col-auto d-none d-lg-block">
        <img width={'auto'} height={250} src={src} alt="Product image" />
      </div>
    </div>
    </div>
  );
};

export default Return;
