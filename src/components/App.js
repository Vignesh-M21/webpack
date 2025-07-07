import React from "react";
import { ProductList } from "./shared/ProductList/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../redux/features/counter/counterSlice";

export function App() {
  const counter = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  console.log("Counter value:", counter);
  return (
    <>
      <ProductList />
      <button onClick={() => dispatch(increment())}>increment {counter}</button>
    </>
  );
}
