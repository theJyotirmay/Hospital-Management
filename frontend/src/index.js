import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { userTheme } from "./theme/userTheme";

import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Toaster/>
      <ThemeProvider theme={userTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>
);


