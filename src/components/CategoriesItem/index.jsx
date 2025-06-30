import React, { useContext } from "react";
import s from "./index.module.scss";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../ThemeContext";

export default function CategoryItem({ id, image,title }) {

  const {theme} = useContext(ThemeContext);
  
  return (
    <Link to={`/categories/${id}`}>
      <div className=
      {`${s.categoryItem} ${theme === 'dark' ? s['categoryItem_dark'] : ''}`}
      >
        <img src={`${import.meta.env.VITE_API_URL}${image}`} alt={title} />
        <p>{title}</p>
      </div>
    </Link>
  );
}
