import React, { useContext } from "react";
import bag from "./images/bag.svg";
import heart from "./images/heart.svg";
import { useDispatch } from "react-redux";
import { deleteProductFromFavoriteAction } from "../../store/reducers/favoriteReducer";
import { addProductToCartAction } from "../../store/reducers/cartReducer";
import { Link } from "react-router-dom";
import s from "./index.module.scss";
import { ThemeContext } from "../../ThemeContext";

export default function FavoriteItem({
  id,
  title,
  price,
  image,
  discont_price,
}) {
  const { theme } = useContext(ThemeContext);

  const dispatch = useDispatch();

  const discountPercentage = discont_price
    ? Math.round(((price - discont_price) / price) * 100)
    : null;

  const handleAddToCartAndRemoveFromFavorite = () => {
    dispatch(
      addProductToCartAction({ id, image, title, price, discont_price })
    );
    dispatch(deleteProductFromFavoriteAction(id));
  };

  return (
    <div
      className={`${s.product_card_container} ${
        theme === "dark" ? s["product_card_container_dark"] : ""
      }`}
    >
      <div key={id} className={s.sales_card}>
        <div className={s.icon_container}>
          <img
            src={heart}
            className={s.icon}
            alt="Heart Icon"
            onClick={() => dispatch(deleteProductFromFavoriteAction(id))}
          />
          <img
            src={bag}
            className={s.icon}
            alt="Bag Icon"
            onClick={() =>
              handleAddToCartAndRemoveFromFavorite({
                id,
                image,
                title,
                price,
                discont_price,
              })
            }
          />
        </div>
        <Link to={`/products/${id}`}>
          <div className={s.image_container}>
            <img
              src={`${import.meta.env.VITE_API_URL}${image}`}
              alt={title}
              className={s.sale_image}
            />
            {discont_price && (
              <div className={s.discount_info}>-{discountPercentage}%</div>
            )}
          </div>
          <div className={s.price_box}>
            <div className={s.description}>
              <p className={s.descriptionp}>{title}</p>
            </div>
            <div className={s.price_container}>
              {discont_price ? (
                <>
                  <p className={s.new_price}>${discont_price}</p>
                  <p className={s.old_price}>${price}</p>
                </>
              ) : (
                <p className={s.new_price}>${price}</p>
              )}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
