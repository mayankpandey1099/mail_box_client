import React from "react";
import {createRoot} from "react-dom/client";
import App from "./components/App";
import "./style.css";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./Utils/Store";

const container = document.getElementById("root");
const root = createRoot(container); // Create a root

root.render(
  <Provider store={store}>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </Provider>
);
