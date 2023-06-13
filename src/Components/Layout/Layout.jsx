import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'

import styles from './Layout.module.css'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCart } from '../../redux/Slices/CartSlice'



export default function Layout({userData,setUserData}) {


  let dispatch = useDispatch()


  useEffect(() => {
    dispatch(getCart())
  }, [])




  return <>
    <div className="fixed-top">
      <Navbar userData={userData} setUserData={setUserData} />
    </div>
    <div className='fixedHeight'>
      <Outlet></Outlet>
    </div>
    <Footer />
  </>
}
