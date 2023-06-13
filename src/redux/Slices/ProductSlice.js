import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export let getAllProducts = createAsyncThunk('product/getAllProducts', async () => {
    let { data } = await axios('https://route-ecommerce-app.vercel.app/api/v1/products')
    return data;
})

export let getProductsByBrand = createAsyncThunk('product/getProductsByBrand', async (id) => {
    let{data}=await axios(`https://route-ecommerce-app.vercel.app/api/v1/products?brand=${id}`)  
    return data;
})

export let getProductsByCate = createAsyncThunk('product/getProductsByCate', async (id) => {
    let{data}=await axios(`https://route-ecommerce-app.vercel.app/api/v1/products?category[in][]=${id}`)
    return data;
})


export let getProductInfo = createAsyncThunk('product/getProductInfo', async (id) => {
    let {data}=await axios(`https://route-ecommerce-app.vercel.app/api/v1/products/${id}`)
    return data;
})




let ProductSlice = createSlice({
    name: "product",
    initialState: {productInfo:{},productCategoryList:[], productBrandList:[],productList: [], loading: false ,numberOfPages:0},

    extraReducers: (bulider) => {
        bulider.addCase(getAllProducts.pending, (state) => {
            state.loading = true
        })
        bulider.addCase(getAllProducts.fulfilled, (state, action) => {
            let {data}=action.payload
            state.productList = data
            state.loading = false

        })
        bulider.addCase(getProductsByBrand.pending, (state) => {
            state.loading = true
        })
        bulider.addCase(getProductsByBrand.fulfilled, (state, action) => {
            let {data}=action.payload
            state.productBrandList = data
            state.loading = false

        })

        bulider.addCase(getProductsByCate.pending, (state) => {
            state.loading = true
        })
        bulider.addCase(getProductsByCate.fulfilled, (state, action) => {
            let {data}=action.payload
            state.productCategoryList = data
            state.loading = false

        })


        bulider.addCase(getProductInfo.pending, (state) => {
            state.loading = true
        })
        bulider.addCase(getProductInfo.fulfilled, (state, action) => {
            let {data}=action.payload
            state.productInfo = data
            state.loading = false

        })
    }

})

export let productReduser =ProductSlice.reducer
