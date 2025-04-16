import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./userSlicer";
import  listOfUserReducer from "./userDataSlice"

export default configureStore({
    reducer: {
        user: userReducer,
        connections: listOfUserReducer
    }
})