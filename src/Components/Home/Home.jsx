import React, { useContext, useEffect } from 'react'
import styles from './Home.module.css'
import CategorySlider from '../CategorySlider/CategorySlider'
import Products from '../Products/Products'
import { useDispatch } from 'react-redux'
import { getCart } from '../../redux/Slices/CartSlice'

export default function Home() {
  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCart())
  }, [])

  return <>
  <div className='container mx-auto py-2 my-5'>
  <h2 className='text-center my-5 fw-bolder '>Categories</h2>
  <CategorySlider/>
  <Products/>
</div>
  </>
}
