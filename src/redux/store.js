import { configureStore } from "@reduxjs/toolkit";
import { productReduser } from "./Slices/ProductSlice";
import { BrandReducer } from "./Slices/BrandSlice";
import { CategorieReducer } from "./Slices/CategorySlice";
import { CartReducer } from "./Slices/CartSlice";


export let store =configureStore({
    reducer:{
        productReduser, 
        BrandReducer ,
        CategorieReducer ,
        CartReducer    
    }
})