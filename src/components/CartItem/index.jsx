import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import {
  decrementCountAction,
  deleteProductFromCartAction,
  incrementCountAction,
} from "../../store/reducers/cartReducer";
import s from "./index.module.scss";
import { ThemeContext } from "../../ThemeContext";

export default function CartItem({
  id,
  title,
  price,
  image,
  count,
  discont_price,
}) {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  return (
    <div
      className={`${s.cartitem} ${theme === "dark" ? s["cartitem_dark"] : ""}`}
    >
      <img
        src={`${import.meta.env.VITE_API_URL}${image}`}
        className={s.cartimgcontainer}
      />
      <div className={s.cartcontentcontainer}>
        <div className={s.hcart}>
          <p className={s.hcartt}>{title}</p>
          <button className={s.button_close} onClick={() => dispatch(deleteProductFromCartAction(id))}>
            <span>X</span>
          </button>
        </div>
        <div className={s.pricecartcontainer}>
          <div className={s.cartcontainercounter}>
            <button onClick={() => dispatch(decrementCountAction(id))}>
              -
            </button>
            <div className={s.countercontainer}>
              <p>{count}</p>
            </div>

            <button onClick={() => dispatch(incrementCountAction(id))}>
              +
            </button>
          </div>
          <div className={s.pricecontainer}>
            {discont_price ? (
              <>
                <p className={s.containerprice}>${discont_price * count}</p>
                <p className={s.discount_pricecontainer}>${price * count}</p>
              </>
            ) : (
              <p className={s.containerprice}>${price * count}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
