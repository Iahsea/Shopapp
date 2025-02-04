import {
  FETCH_CATEGORY_SUCCESS,
  RESET_CATEGORY,
} from "../action/categoryAction";

const INITIAL_STATE = {
  category: {
    id: "",
  },
};

const categoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_CATEGORY_SUCCESS:
      console.log("check category action", action);

      return {
        ...state,
        category: {
          id: action?.payload?.id,
        },
      };

    case RESET_CATEGORY:
      return {
        ...state,
        category: {
          id: "",
        },
      };

    default:
      return state;
  }
};

export default categoryReducer;
