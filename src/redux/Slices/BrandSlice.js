import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");



export let getbrands = createAsyncThunk('Brands/getbrands', async () => {
    let{data}=await axios('https://route-ecommerce-app.vercel.app/api/v1/brands')
    return data;
})


let BrandSlice = createSlice({
    name:"Brands",
    initialState:{BrandeList:[],loading:false},
    extraReducers:(bulider)=>{
        bulider.addCase(getbrands.pending, (state) => {
            state.loading = true
        })
        bulider.addCase(getbrands.fulfilled, (state, action) => {
            let {data}=action.payload
            state.BrandeList = data
            state.loading = false

        })
    }

})

export let BrandReducer =BrandSlice.reducer
