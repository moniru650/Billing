import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "../ShareModule/Header/Header";
import Footer from "../ShareModule/Footer/Footer";
import Sidebar from "../Component/Sidebar/Sidebar";
import { privateRoute } from "./RouterData";

export default function Rout() {
  const { sidebarSize } = useSelector((state) => state.layout);
  return (
    <>
      <div
        id="main-wrapper"
        className={sidebarSize === true ? "show" : "show menu-toggle"}
      >
        <Router>
          <Header />
          <Sidebar />
          <Routes>
            {privateRoute.map(({ element, path },idx) => (
              <Route path={path} element={element} key={idx}/>
            ))}
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}
