import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./styles.css";
import Login from "./pages/LoginPage";
import { Provider } from "react-redux";
import store from "./store/store";
import AuthProvider from "./store/authentication/AuthProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <Provider store={store}>
    <AuthProvider>
      <React.StrictMode>
        <Router>
          <Routes>
            <Route path="/*" element={<App />} />
            <Route path="/admin" element={<Login />} />
            <Route path="/admin" element={<Navigate to="/admin" replace />} />
          </Routes>
        </Router>
      </React.StrictMode>
    </AuthProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
