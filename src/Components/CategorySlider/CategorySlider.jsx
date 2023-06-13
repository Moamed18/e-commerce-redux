import React, { useContext, useEffect, useState } from 'react'
import styles from './CategorySlider.module.css'
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import { getCategories } from '../../redux/Slices/CategorySlice';
import { useDispatch, useSelector } from 'react-redux';

export default function CategorySlider() {

  
  let { CategorieList, loading } = useSelector((state) => state.CategorieReducer)



  let dispatsh = useDispatch()

  useEffect(() => {
    dispatsh(getCategories())
  }, [])


  const settings = {
    // dots: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    slidesToShow: 4,
    slidesToScroll: 1
  };
  

  return <>
{loading?<div className='col-12 text-center my-5 py-5'>
          <i className='fa fa-spin fa-spinner fa-3x text-main'></i>
        </div>: <div className='col-11 mx-auto'>
        <Slider {...settings}>
     {CategorieList.map((cat)=><div key={cat._id}>
      <Link to={'/ProductByCategory/'+cat._id}>
      <div>
      <img src={cat.image} height={200} className='w-100' alt="" />
      <h3 className='h6 text-center py-2 text-main'>{cat.name}</h3>
      </div>
      </Link>
     </div>)}
    </Slider>
        </div>
        
        }
   

    

  </>
}
