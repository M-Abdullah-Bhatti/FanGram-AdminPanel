import React from "react";
import ReactDOM from "react-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";

ReactDOM.render(
	<React.StrictMode>
	 <ToastContainer position="top-right" autoClose={3000} />
		<App />
	</React.StrictMode>,
	document.getElementById("root")
);
