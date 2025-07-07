import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/components/App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store/store";

// console.log("I am calling my name", API_URL);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
