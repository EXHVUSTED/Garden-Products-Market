import img from "./image_header/logo.svg";
import img1 from "./image_header/mode.svg";
import img6 from "./image_header/mode-dark.svg";
import img2 from "./image_header/heart.svg";
import img4 from "./image_header/heart-dark.svg";
import img3 from "./image_header/tache.svg";
import img5 from "./image_header/bag-dark.svg";
import s from "./index.module.scss";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { addProductToCartAction } from "../../store/reducers/cartReducer";
import { ThemeContext } from "../../ThemeContext";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const { theme, toggleTheme } = useContext(ThemeContext);

  const productsState = useSelector((store) => store.products.data);
  const cartState = useSelector((store) => store.cart);
  const favoriteState = useSelector((store) => store.favorite);

  const [productOfTheDay, setProductOfTheDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const totalCount = cartState.reduce((acc, elem) => acc + elem.count, 0);
  const favoriteCount = favoriteState.reduce((acc, elem) => acc + elem.count, 0);

  const today = new Date().toDateString();

  useEffect(() => {
    const savedProduct = JSON.parse(localStorage.getItem("productOfTheDay"));

    if (savedProduct && savedProduct.discountDate === today) {
      setProductOfTheDay(savedProduct);
      setLoading(false);
    } else {
      fetch(`${apiUrl}/products/all`)
        .then((response) => {
          if (!response.ok) throw new Error("Error fetching products");
          return response.json();
        })
        .then((products) => {
          const randomIndex = Math.floor(Math.random() * products.length);
          const selectedProduct = products[randomIndex];

          const discountProduct = {
            ...selectedProduct,
            discountedPrice: (selectedProduct.price * 0.5).toFixed(2),
            discountDate: today,
          };

          localStorage.setItem("productOfTheDay", JSON.stringify(discountProduct));
          setProductOfTheDay(discountProduct);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [today]);

  const handleDiscountClick = () => {
    setIsModalOpen(true);
  };

  const closeDiscount = () => {
    setIsModalOpen(false);
  };

  const handleAddToCart = () => {
    if (productOfTheDay) {
      dispatch(
        addProductToCartAction({
          ...productOfTheDay,
          price: productOfTheDay.price,
          discont_price: productOfTheDay.discountedPrice,
          count: 1,
        })
      );
    }
    setIsModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <header className={`${s.header} ${theme === "dark" ? s["header-dark"] : ""}`}>
      <div className={s.logo}>
        <img className="logo" src={img} alt="logo" />
        <button onClick={toggleTheme}>
          <img className={s.mode} src={theme === "dark" ? img6 : img1} alt="mode" />
        </button>
      </div>

      

      <div className={`${s.burger} ${theme === 'dark' ? s['burger-dark'] : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

        <nav className={`${s.navList} ${isMenuOpen ? s.open : ''}`}>
          <div className={s.pages}>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Main Page</Link>
            <Link to="/categories" onClick={() => setIsMenuOpen(false)}>Categories</Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)}>All products</Link>
            <Link to="/sales" onClick={() => setIsMenuOpen(false)}>All sales</Link>
          </div>
          <Link className={s.discount_banner} onClick={() => {handleDiscountClick(); setIsMenuOpen(false);}}>Product of the Day</Link>
      </nav>

      <div className={s.icons}>
        <Link to="/favorites">
          <img className="icon" src={theme === "dark" ? img4 : img2} alt="favorite icon" />
          <span>{favoriteCount}</span>
        </Link>
        <Link to="/cart">
          <img className="cart" src={theme === "dark" ? img5 : img3} alt="cart icon" />
          <span>{totalCount}</span>
        </Link>
      </div>

      {isModalOpen && productOfTheDay && (
        <div className={`${s.modal} ${theme === "dark" ? s["modal_dark"] : ""}`}>
          <div className={s.modal_content}>
            <div className={s.modal_title}>
              <p>50% discount on product of the day!</p>
              <button onClick={closeDiscount}>X</button>
            </div>
            <div className={s.modal_product}>
              <div className={s.modal_product_content}>
                <img
                  src={`${import.meta.env.VITE_API_URL}${productOfTheDay.image}`}
                  alt={productOfTheDay.title}
                />
                <div className={s.modal_product_txt}>
                  <div className={s.module_product_title}>
                    <h2>{productOfTheDay.title}</h2>
                  </div>
                  <div className={s.modal_product_price}>
                    <div className={s.modal_product_price_main}>
                      <p>${productOfTheDay.discountedPrice}</p>
                    </div>
                    <div className={s.modal_product_discount}>
                      <p>${productOfTheDay.price}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={s.modal_product_button_container}>
                <button onClick={handleAddToCart}>
                  <p>Add to Cart</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
