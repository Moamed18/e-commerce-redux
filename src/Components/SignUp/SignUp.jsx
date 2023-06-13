import axios from 'axios'
import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'

export default function SignUp() {
  let navigate = useNavigate()




  const [loading, setloading] = useState(false)
  const [messageErr, setmessageErr] = useState('')

  async function handelSignup(values) {
      setloading(true)
      let { data } = await axios.post('https://route-ecommerce-app.vercel.app/api/v1/auth/signup', values).catch((err) => {
          setmessageErr(`${err.response.data.message}`)
          setloading(false)
      })
      if (data.message === 'success') {

          setloading(false)
          navigate('/Login')
        }
  }
  let validationSchema = Yup.object({
      name: Yup.string().required('name is required').min(3, 'name min is 3').max(10, 'name max is 10'),
      email: Yup.string().required('email is required').email('email is invalid'),
      password: Yup.string().required('password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Minimum eight characters, at least one letter and one number'),
      rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref('password')], "rePassword and password dosenot match"),
      phone: Yup.string().required('phone is required').matches(/^01[0125][0-9]{8}$/, 'phone must be egyption phone number')

  })
  let formik = useFormik({
      initialValues: {
          name: '',
          email: '',
          password: '',
          rePassword: '',
          phone: ''
      },
      validationSchema
      ,
      onSubmit: handelSignup
  })



  
 

  return <>
    <div className='container py-5 my-5'>
    <form onSubmit={formik.handleSubmit} className='w-100 my-5 mx-auto my-5 shadow-lg p-4 rounded-4 bg-secondary-subtle  text-center'>

{messageErr !== '' ? <div className='alert alert-danger'>{messageErr}</div> : null}

<label htmlFor="name">Name :</label>
<input className='form-control mb-2' type="text" name='name' id='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
{formik.errors.name && formik.touched.name ? <div className='alert alert-danger'>{formik.errors.name}</div> : null}



<label htmlFor="email">Email :</label>
<input className='form-control mb-2' type="email" name='email' id='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
{formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : null}


<label htmlFor="password">Password :</label>
<input className='form-control mb-2' type="password" name='password' id='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
{formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : null}


<label htmlFor="rePassword">rePassword :</label>
<input className='form-control mb-2' type="password" name='rePassword' id='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
{formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger'>{formik.errors.rePassword}</div> : null}


<label htmlFor="phone">phone :</label>
<input className='form-control mb-2' type="tel" name='phone' id='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
{formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : null}

{loading ?
  <button type='button' className='btn bg-main text-white'><i className='fa fa-spinner fa-spin'></i></button>
  : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Regstrtion</button>
}




</form>
    </div>


  </>
}
