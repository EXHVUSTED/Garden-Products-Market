import React, { useContext } from "react";
import s from "./index.module.scss";
import bag from "./images/bag.svg";
import heart from "./images/heart.svg";
import baggreen from "./images/cart green.svg";
import heartgreen from "./images/heart green.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCartAction,
  deleteProductFromCartAction,
} from "../../store/reducers/cartReducer";
import {
  addProductToFavoriteAction,
  deleteProductFromFavoriteAction,
} from "../../store/reducers/favoriteReducer";
import { ThemeContext } from "../../ThemeContext";

const ProductsCard = ({ id, title, image, price, discont_price }) => {
  const { theme } = useContext(ThemeContext);

  const dispatch = useDispatch();

  const discountPercentage = discont_price
    ? Math.round(((price - discont_price) / price) * 100)
    : null;

  const cart = useSelector((state) => state.cart);
  const isInCart = cart.some((product) => product.id === id);

  const favorites = useSelector((state) => state.favorite);
  const isInFavorite = favorites.some((product) => product.id === id);

  const handleCartClick = () => {
    if (isInCart) {
      dispatch(deleteProductFromCartAction(id));
    } else {
      dispatch(
        addProductToCartAction({ id, discont_price, price, title, image })
      );
    }
  };

  const handleFavoriteClick = () => {
    if (isInFavorite) {
      dispatch(deleteProductFromFavoriteAction(id));
    } else {
      dispatch(
        addProductToFavoriteAction({ id, image, title, price, discont_price })
      );
    }
  };

  return (
    <div
      key={id}
      className={`${s.sales_card} ${
        theme === "dark" ? s["sales_card_dark"] : ""
      }`}
    >
      <div className={s.icon_container}>
        <img
          src={isInFavorite ? heartgreen : heart}
          className={s.icon}
          alt={isInFavorite ? "Green Heart Icon" : "Heart Icon"}
          onClick={handleFavoriteClick}
        />
        <img
          src={isInCart ? baggreen : bag}
          className={s.icon}
          alt={isInCart ? "Green Bag Icon" : "Bag Icon"}
          onClick={handleCartClick}
        />
      </div>

      <Link to={`/products/${id}`}>
        <div className={s.image_container}>
          <img
            src={`${import.meta.env.VITE_API_URL}${image}`}
            // src={`http://localhost:3333${image}`}
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
  );
};

export default ProductsCard;
