import React, { useContext, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Outlet } from "react-router-dom";
import s from "./index.module.scss";
import { ThemeContext } from "../../ThemeContext";

const Layout = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`${s.layout} ${theme === "dark" ? s["theme-dark"] : s["theme-light"]}`}>
      <Header />

      <main className={s.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;

