export const FETCH_KEYWORD = "FETCH_KEYWORD";
export const RESET_KEYWORD = "RESET_KEYWORD";

export const fetchKeyword = (keyword) => {
  return {
    type: FETCH_KEYWORD,
    payload: { search: keyword },
  };
};

export const resetCategory = () => ({
  type: RESET_KEYWORD,
});
