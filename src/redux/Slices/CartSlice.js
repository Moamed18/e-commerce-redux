



import axios from "axios";
import { toast } from "react-hot-toast";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export let addToCart = createAsyncThunk('Cart/addToCart', async (x) => {
    let headers = {
        token: localStorage.getItem('userToken')
    }
    let { data } = await axios.post('https://route-ecommerce-app.vercel.app/api/v1/cart',
    {
      productId: x
    },
    {
      headers: headers
    })
    return data;
})


export let getCart = createAsyncThunk('Cart/getCart', async () => {
    let headers = {
        token: localStorage.getItem('userToken')
    }
    let { data } = await axios('https://route-ecommerce-app.vercel.app/api/v1/cart', {
        headers: headers
    })
    return data;
})


export let updateProductCount = createAsyncThunk('Cart/updateProductCount', async ({id, count}) => {
    let headers = {
        token: localStorage.getItem('userToken')
    }
    console.log(id,count);

    let { data } = await axios.put(`https://route-ecommerce-app.vercel.app/api/v1/cart/${id}`,
        {
            count
        },
        {
            headers
        })
    return data;
})



export let deleteProduct = createAsyncThunk('Cart/deleteProduct', async (x) => {
    let headers = {
        token: localStorage.getItem('userToken')
    }
    let { data } = await axios.delete(`https://route-ecommerce-app.vercel.app/api/v1/cart/${x}`,
        {
            headers: headers
        })
    return data;
})

export let deleteAllProduct = createAsyncThunk('Cart/deleteAllProduct', async () => {
    let headers = {
        token: localStorage.getItem('userToken')
    }
    let { data } = await axios.delete(`https://route-ecommerce-app.vercel.app/api/v1/cart`,
        {
            headers: headers
        })

})





let CartSlice = createSlice({
    name: "Cart",
    initialState: { CartList: null, carttId: null, numberOfCart: 0, totalPrise: 0, loading: false },
    extraReducers: (bulider) => {
        bulider.addCase(getCart.pending, (state) => {
            state.loading = true
        })
        bulider.addCase(getCart.rejected, (state) => {
            state.CartList = []
            state.carttId = null
            state.totalPrise = 0
            state.numberOfCart = 0
            state.loading = false
        })
        bulider.addCase(getCart.fulfilled, (state, action) => {
            state.CartList = action.payload.data.products
            state.carttId = action.payload.data._id
            state.totalPrise = action.payload.data.totalCartPrice
            state.numberOfCart = action.payload.numOfCartItems
            state.loading = false
        })

        bulider.addCase(updateProductCount.rejected, () => {
            toast.error("error")
        })

        bulider.addCase(updateProductCount.fulfilled, (state, action) => {
            state.CartList = action.payload.data.products
            state.totalPrise = action.payload.data.totalCartPrice
            toast.success("proudct count updated")
        })

        bulider.addCase(deleteProduct.rejected, () => {
            toast.error("error")
        })

        bulider.addCase(deleteProduct.fulfilled, (state, action) => {
            state.CartList = action.payload.data.products
            state.totalPrise = action.payload.data.totalCartPrice
            state.numberOfCart = action.payload.numOfCartItems
            toast.success("proudct is  deleted")
        })

        bulider.addCase(deleteAllProduct.rejected, () => {
            toast.error("error")
        })

        bulider.addCase(deleteAllProduct.fulfilled, (state) => {
            state.CartList = null
            state.totalPrise = 0
            state.numberOfCart = 0
            toast.success("cart is  deleted")
        })
        
        
        bulider.addCase(addToCart.fulfilled, (state, action) => {
            state.numberOfCart = action.payload.numOfCartItems
            toast.success(action.payload.message)
        })
        bulider.addCase(addToCart.rejected, () => {
            toast.success("error")
        })


    }

})

export let CartReducer = CartSlice.reducer
