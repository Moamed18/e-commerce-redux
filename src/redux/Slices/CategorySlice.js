import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");



export let getCategories = createAsyncThunk('categories/getCategories', async () => {
    let{data}=await axios('https://route-ecommerce-app.vercel.app/api/v1/categories')
    return data;
})


let CategorySlice = createSlice({
    name:"categories",
    initialState:{CategorieList:[],loading:false},
    extraReducers:(bulider)=>{
        bulider.addCase(getCategories.pending, (state) => {
            state.loading = true
        })
        bulider.addCase(getCategories.fulfilled, (state, action) => {
            let {data}=action.payload
            state.CategorieList = data
            state.loading = false

        })
    }

})

export let CategorieReducer =CategorySlice.reducer
