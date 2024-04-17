import {configureStore} from "@reduxjs/toolkit"
import authSlice from "./authSclice.js"

const store = configureStore({
    reducer : {
        auth : authSlice ,
    }
})

export default store;