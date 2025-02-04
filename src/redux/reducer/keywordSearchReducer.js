import { FETCH_KEYWORD, RESET_KEYWORD } from "../action/keywordSearchAction";

const INITIAL_STATE = {
  keyword: {
    search: "",
  },
};

const keywordSearchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_KEYWORD:
      return {
        ...state,
        keyword: {
          search: action?.payload?.search,
        },
      };

    case RESET_KEYWORD:
      return {
        ...state,
        keyword: {
          search: "",
        },
      };

    default:
      return state;
  }
};

export default keywordSearchReducer;
