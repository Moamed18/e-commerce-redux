import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import Slider from "react-slick";
import { getProductInfo } from '../../redux/Slices/ProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/Slices/CartSlice';

export default function ProductDetails() {



  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray", borderRadius: "50%", paddingTop: "1px" }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "gray", borderRadius: "50%", paddingTop: "1px" }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  
  

  let { productInfo, loading } = useSelector((state) => state.productReduser)



  let dispatsh = useDispatch()

  let { id } = useParams()



  useEffect(() => {

    dispatsh(getProductInfo(id))

  }, [])

  console.log(productInfo);

  return <>
    <div className="row container mx-auto align-items-center g-5 py-5 my-5 ">

      {loading ? <div className='col-12 text-center my-5 py-5'>
        <i className='fa fa-spin fa-spinner fa-3x text-main'></i>
      </div> : <>
       <div className="col-md-6 col-lg-4">
        <div className='shadow-lg rounded-3 overflow-hidden p-5'>
          <Slider {...settings}>
            {productInfo?.images?.map((img) => <img src={img} />)}
          </Slider>
        </div>
      </div>
        <div className="col-md-6 col-lg-8">
          <h3 className='fw-bolder'>{productInfo.title}</h3>
          <h6 className='py-2'>{productInfo.description}</h6>
          <span className='text-main'>{productInfo?.category?.name}</span>
          <div className='d-flex justify-content-between py-2'>
            <span className='text-muted'>{productInfo.price} EGP</span>
            <span>
              <i className='fa fa-star rating-color'></i>
              {productInfo.ratingsAverage}
            </span>
          </div>
          <button onClick={() => dispatsh(addToCart(productInfo._id))} className='btn bg-main w-100'>+ add</button>



        </div></>}


    </div>
  </>
}
