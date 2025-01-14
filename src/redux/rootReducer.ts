import { combineReducers } from "@reduxjs/toolkit";
import LoginReducer from './loginReducer';

export default combineReducers({
    userLoginReducer: LoginReducer,
})