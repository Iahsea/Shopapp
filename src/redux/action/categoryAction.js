export const FETCH_CATEGORY_SUCCESS = "FETCH_CATEGORY_SUCCESS";
export const RESET_CATEGORY = "RESET_CATEGORY";

export const fetchCategorySuccess = (categoryId) => {
  return {
    type: FETCH_CATEGORY_SUCCESS,
    payload: { id: categoryId },
  };
};

export const resetCategory = () => ({
  type: RESET_CATEGORY,
});
