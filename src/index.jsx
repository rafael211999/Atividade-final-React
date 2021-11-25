import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";

import { AlunoProvider } from "./context";
import App from "./components/App";


ReactDOM.render(
	<React.StrictMode>
		<AlunoProvider>
			<BrowserRouter>
				<Navbar />
				<App />
			</BrowserRouter>
		</AlunoProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
