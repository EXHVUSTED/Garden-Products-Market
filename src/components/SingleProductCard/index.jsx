import React, { useContext, useEffect, useState } from "react";
import s from "./index.module.scss";
import heart_dark from './images/heart-dark.svg'
import heart from "./images/heart.svg";
import heartgreen from "./images/heart green.svg";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../requests/products";
import { addProductToFavoriteAction, deleteProductFromFavoriteAction } from "../../store/reducers/favoriteReducer";
import {
  addProductToCartAction,
  decrementCountAction,
  deleteProductFromCartAction,
  incrementCountAction,
} from "../../store/reducers/cartReducer";
import CartItem from "../CartItem";
import { ThemeContext } from "../../ThemeContext";


const SingleProductCard = () => {
  const {theme} = useContext(ThemeContext);
  const [count, setCount] = useState(1); 
  const favoriteState = useSelector((store) => store.favorite);
  const cartState = useSelector((store) => store.cart);
  const singleProductState = useSelector((store) => store.singleProduct);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { product_id } = useParams();

  useEffect(() => {
    dispatch(getSingleProduct(product_id));
  }, [dispatch, product_id]);

  const { id, title, price, discont_price, description, image } = singleProductState;  

  const discountPercentage = discont_price
    ? Math.round(((price - discont_price) / price) * 100)
    : null;

  const handleAddToCart = () => {

    const existingCartItem = cartState.find((item) => item.id === id);

    if (existingCartItem) {
      
      for (let i = 0; i < count; i++) {
        dispatch(incrementCountAction(id)); 
      }
    } else {
      dispatch(
        addProductToCartAction({
          id,
          image,
          title,
          price,
          discont_price,
          count
        })
      );
    }

    setCount(1); 
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const favorites = useSelector((state) => state.favorite);
  const isInFavorite = favorites.some((product) => product.id === id);

  const handleFavoriteClick = () => {
    if (isInFavorite) {
      dispatch(deleteProductFromFavoriteAction(id)); // Если товар в избранном, удаляем его
    } else {
      dispatch(addProductToFavoriteAction({ id, image, title, price, discont_price })); // Если товара нет в избранном, добавляем его
    }
  };

  const [setIsInFavorite] = useState(false);

  const handleClick = () => {
    setIsInFavorite(!isInFavorite); // Переключаем статус избранного
  };

  const iconSrc = theme === 'dark' 
  ? (isInFavorite ? heartgreen : heart_dark) 
  : (isInFavorite ? heartgreen : heart);


  return (
    <div className=
    {`${s.singleProductContainer} ${theme === 'dark' ? s['singleProductContainer_dark'] : ''}`}
    >
      <div>
        <div className={s.img_container}>
          <img
            src={`${import.meta.env.VITE_API_URL}${image}`}
            className={s.product_image}
            onClick={handleImageClick}
            alt={title}
          />
        </div>

        {isModalOpen && (
          <div className={s.modal} onClick={closeModal}>
            <div className={s.modal_content}>
              <img
                src={`${import.meta.env.VITE_API_URL}${image}`}
                className={s.full_image}
                alt={title}
              />
            </div>
          </div>
        )}
      </div>

      <div className={s.content_container}>
        <div className={s.title_container}>
          <h2 className={s.title}>{title}</h2>
          <img
            src={iconSrc}
            // alt="heart"
            onClick={handleFavoriteClick}
          />
        </div>

        <div className={s.price_container}>
          {discont_price ? (
            <>
              <p className={s.new_price}>${discont_price * count}</p>
              <p className={s.old_price}>${price}</p>
            </>
          ) : (
            <p className={s.new_price}>${price * count}</p>
          )}
          {discont_price && (
            <div className={s.sale_info}>-{discountPercentage}%</div>
          )}
        </div>

        <div className={s.button_container}>
          <div className={s.quantity_container}>
            <button
              onClick={() =>
                setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1))
              } // Минимум 1 товар
              className={s.plus_minus}
            > -
            </button>
            <p className={s.number_container}>{count}</p>

            <button
              onClick={() => setCount((prevCount) => prevCount + 1)}
              className={s.plus_minus}
            > +
            </button>
          </div>
          <button
            className={s.green_button}
            onClick={handleAddToCart} 
          >Add to cart
          </button>
        </div>

        <div className={s.description_container}>
          <h3>Description</h3>
          <p>{description}</p>
          <h3>Read more</h3>
        </div>
      </div>
    </div>
  );
};

export default SingleProductCard;
