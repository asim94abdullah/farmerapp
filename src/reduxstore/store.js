import reducer from "./reducers";
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';

export default configureStore({ 
    reducer: reducer,
})