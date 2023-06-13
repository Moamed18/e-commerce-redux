import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import * as Yup from 'yup'
import { useFormik } from 'formik'

export default function Login({saveData}) {
  let navigate=useNavigate()
  


  const [messageErr2, setmessageErr2] = useState('')
  const [loading, setloading] = useState(false)

  
  async function handelLogin(values) {
    setloading(true)
    let { data } = await axios.post('https://route-ecommerce-app.vercel.app/api/v1/auth/signin', values).catch((err) => {
        setmessageErr2(`${err.response.data.message}`)
        setloading(false)
    })
    if (data.message === 'success') {
        setmessageErr2(``)
        localStorage.setItem('userToken', data.token)
        saveData()
        navigate('/')
        setloading(false)


    }
}

let validationSchema2 = Yup.object({
    email: Yup.string().required('email is required').email('email is invalid'),
    password: Yup.string().required('pass is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Minimum eight characters, at least one letter and one number'),
})

let formik2 = useFormik({
    initialValues: {
        email: '',
        password: '',
    },
    validationSchema: validationSchema2,
    onSubmit: handelLogin

})


  return <>
    <div className='container my-5 py-5'>
    <form onSubmit={formik2.handleSubmit} className='w-100 mx-auto  shadow-lg p-4 rounded-4 bg-secondary-subtle  text-center my-5'>

{messageErr2 !== '' ? <div className='alert alert-danger'>{messageErr2}</div> : null}


<label >Email :</label>
<input className='form-control mb-2' type="email" name='email' id='email' value={formik2.values.email} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
{formik2.errors.email && formik2.touched.email ? <div className='alert alert-danger'>{formik2.errors.email}</div> : null}


<label htmlFor="password">Password :</label>
<input className='form-control mb-2' type="password" name='password' id='password' value={formik2.values.password} onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
{formik2.errors.password && formik2.touched.password ? <div className='alert alert-danger'>{formik2.errors.password}</div> : null}


{loading ?
  <button type='button' className='btn bg-main text-white my-2 mx-auto'><i className='fa fa-spinner fa-spin'></i></button>
  : <button disabled={!(formik2.isValid && formik2.dirty)} type='submit' className='btn mx-auto bg-main text-white my-2'>Login</button>
}  </form>
    </div>
  </>
}
