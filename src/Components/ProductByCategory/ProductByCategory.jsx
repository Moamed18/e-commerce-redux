import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductByCategory.module.css'
import { Link, useParams } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { getProductsByCate } from '../../redux/Slices/ProductSlice'
import { addToCart } from '../../redux/Slices/CartSlice'

export default function ProductByCategory() {
  let {id} =useParams()
 

  let { productCategoryList, loading } = useSelector((state) => state.productReduser)
  


  let dispatsh = useDispatch()
  
  useEffect(() => {
    
    dispatsh(getProductsByCate(id))
  }, [])
  
  return <>
  <div className='row container  mx-auto py-2 my-5'>
  <h2 className='text-center  pt-5 fw-bolder '>Products</h2>

  
    {loading?<div className='col-12 text-center my-5 py-5'>
          <i className='fa fa-spin fa-spinner fa-3x text-main'></i>
        </div>:<>
        {productCategoryList.length ==0?<>
  
  <div className='text-center my-5'>
    <h3 className='fw-bolder'>There are no products at the moment and will be available soon</h3>
  </div>
  </>:null}

        {productCategoryList.map((item)=>{
    return <div key={item._id} className='col-md-3 col-lg-2 col-6  overflow-hidden'>
      
      <div className='product px-2 py-3'>
      <Link to={'/ProductDetails/'+item._id}>
        <img src={item.imageCover} className='w-100' alt="" />
        <span className='text-main font-sm fw-bold'>{item.category.name}</span>
        <h3 className='fw-bolder h6'>{item.title.split(' ').slice(0,2).join(' ')}</h3>
        <div className='d-flex justify-content-between'>
          <span className='text-muted'>{item.price} EGP</span>
          <span>
            <i className='fa fa-star rating-color'></i>
            {item.ratingsAverage}
          </span>
        </div>
        </Link>
        <button onClick={()=>dispatsh(addToCart(item._id))} className='btn bg-main w-100'>+ add</button>
      </div>
      
    </div>
    
})
}</>}


  
  
  </div>
  
  </>
}
