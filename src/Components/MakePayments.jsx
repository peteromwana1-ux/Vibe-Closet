import React, { useEffect, useState } from 'react'

import {useLocation} from 'react-router-dom'
import axios from 'axios';
const MpesaPayment = () => {
  // declaring state variable
  const {product}=useLocation().state ||{};
  const [phone,setPhone]=useState("")
  const [message,setMessage]=useState("")
  const[error,setError]=useState("")

  // image url
  const img_url="https://peterhyrax.alwaysdata.net/static/images/"
  const handleSubmit =async(e)=>{
    e.preventDefault()
    setMessage("please wait as we proocess the transaction")
    try{
      // retrieving user and product details
      const formData=new FormData()
      formData.append("phone",phone)
      formData.append("amount",product.product_cost)
      // adding base url
      const response=await axios.post("https://peterhyrax.alwaysdata.net/api/mpesa_payment",formData)
      console.log(response.data)
    }catch(error){
      setError(error.message)
    }
  }

  return (
    <div className='row justify-content-center mb-4'>
      <h1>Lipa Na Mpesa</h1>
      <div className='col-md-3 card shadow m-4 p-4'>
      <img src={img_url + product.product_photo} alt={product.product_photo}/>
      <p>product name :  {product.product_name}</p>
      <p className='text-warning'>poduct cost:  $. {product.product_cost}</p>
        {/* binding variables */}
        {phone}
        {message}
        {error}
      {/* phone input */}
      <form action=""onSubmit={handleSubmit}>
      <label htmlFor="">phone number</label>
        <input 
        type="\tel"
        placeholder='enter phone number'
        className='form-control'
        onChange={(e)=>setPhone(e.target.value)} /><br/>
        
        <button className='btn'>
          Make Payment 
          </button>
      </form>
      </div>
    </div>
  )
}

export default MpesaPayment

