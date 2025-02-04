import { combineReducers } from "redux";
import counterReducer from "./counterReducer";
import userReducer from "./userReducer";
import categoryReducer from "./categoryReducer";
import keywordSearchReducer from "./keywordSearchReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  category: categoryReducer,
  keywordSearch: keywordSearchReducer,
});

export default rootReducer;
