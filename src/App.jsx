import React, { useContext, useState } from "react";
import NotFoundPage from "./pages/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import Layout from "./pages/Layout";
import AllProductsPage from "./pages/AllProductsPage";
import AllSalesPage from "./pages/AllSalesPage";
import CategoriesPage from "./pages/CategoriesPage";
import "./index.scss";
import CartPage from "./pages/CartPage";
import FavoritePage from "./pages/FavoritePage";
import SingleProductPage from "./pages/SingleProductPage";
import ProductsByCategoryPage from "./pages/ProductsByCategoryPage";
import { ThemeContext, ThemeProvider } from "./ThemeContext";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`main_container ${
        theme === "dark" ? "dark-theme" : "light-theme"
      }`}
    >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/products/:product_id" element={<SingleProductPage />} />
          <Route path="/sales" element={<AllSalesPage />} />
          <Route path="/categories/" element={<CategoriesPage />} />
          <Route path="/categories/:id" element={<ProductsByCategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default function Root() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}
