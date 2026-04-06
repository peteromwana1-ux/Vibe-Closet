import React, { useState, useEffect } from 'react';

function Cart() {
  const [cart, setCart] = useState([]);
  const img_url = "https://peterhyrax.alwaysdata.net/static/images/";

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <div className="page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items yet.</p>
      ) : (
        <div className="container">
          <div className="row">
            {cart.map((product, index) => (
              <div className='col-12 col-sm-6 col-md-4 justify-content-center mb-4' key={index}>
                <div className='card shadow card-margin'>
                  <img className='mt-2 product_img' src={img_url + product.product_photo} alt={product.product_photo} />
                  <div className='card-body'>
                    <h5 className='mt-2'>{product.product_name}</h5>
                    <p>{product.product_description}</p>
                    <b className='p-4 danger'>$. {product.product_cost}</b><br />
                    <button className='btn' onClick={() => removeFromCart(index)}>Remove from Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;