import React, { useEffect, useState } from 'react'

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  // declaring state varibles
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  // IMAGE URL
  const img_url = "https://peterhyrax.alwaysdata.net/static/images/"
  // navigation
  const navigate = useNavigate()
  // function to add products 
  const home = async () => {
    setLoading("Please wait as we process you request")
    try {
      const response = await axios.get("https://peterhyrax.alwaysdata.net/api/get_product_details")
      setProducts(response.data)
      setLoading("")

    } catch (error) {
      setError(error.message)
    }
  }

  // function to add to cart
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  // use effect to retrieve products automatically
  useEffect(() => {
    home()
  }, []);

  if (loading) return <div>{loading}</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div >

      <div className="hero-left">
        <h1>
          VIBE<br /> CLOSET
        </h1>
        <p>Wear Your Energy</p>
      </div>

      <div className="container">
        <div className="row">
          {products.map((product) => (
            <div className='col-12 col-sm-6 col-md-4 justify-content-center mb-4'
              key={product.product_id}>
              <div className='card shadow card-margin'>
                <img className='mt-2 product_img' src={img_url + product.product_photo} alt={product.product_photo} />
                {/* The product details  */}
                <div className='card-body'>
                  <h5 className='mt-2'>{product.product_name}</h5>
                  <b className='p-4 danger'>Ksh. {product.product_cost}</b><br />
                  <button className='btn' onClick={() => addToCart(product)}>Add to Cart</button>
                  <button className='btn' onClick={() => navigate("/makepayment", { state: { product } })}>Purchase Now</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>


  );
}

export default Home;