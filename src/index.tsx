import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App";
import Footer from "./components/organisms/Footer";
import reportWebVitals from "./reportWebVitals";
import "./styles.css";
import Header from "./components/organisms/Header";
import Login from "./pages/login";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin" element={<Navigate to="/admin" replace />} />
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
