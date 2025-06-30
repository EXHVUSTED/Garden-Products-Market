import { loadAllCategoriesAction } from "../../store/reducers/categoriesRedusers";

export const getAllCategories = (dispatch) => {
    // fetch("http://localhost:3333/categories/all")
    fetch(`${import.meta.env.VITE_API_URL}/categories/all`)
      .then((res) => res.json())
      .then((json) => dispatch(loadAllCategoriesAction(json)))
      .catch((error) => console.error("Error fetching all products:", error));
  };