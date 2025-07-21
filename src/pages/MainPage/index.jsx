import React from "react";
// import Sales from '../../components/Sales'
import Banner from "../../components/MainBanner";
import Categories from "../../components/Categories";
import DiscountForm from "../../components/DiscountForm";
import BannerSales from "../../components/BannerSales";
import s from "./index.module.scss";

const MainPage = () => {
  return (
    <div className={s.mainpage}>
      <Banner />
      <Categories />
      <DiscountForm />
      <BannerSales />
    </div>
  );
};

export default MainPage;