import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "@/components/App";
import "./index.css";

// console.log("I am calling my name", API_URL);
createRoot(document.getElementById("root")).render(<App />);
