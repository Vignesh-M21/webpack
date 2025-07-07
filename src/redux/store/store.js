// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice"; // Example reducer
import productsReducer from "../features/products/productsSlice"; // Example reducer

const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productsReducer,
  },
});

export default store;
