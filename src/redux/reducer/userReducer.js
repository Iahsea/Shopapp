import { INCREMENT, DECREMENT } from "../action/counterAction";
import { FETCH_USER_LOGIN_SUCCESS } from "../action/userAction";

const INITIAL_STATE = {
  account: {
    id: "",
    message: "",
    refresh_token: "",
    roles: "",
    token: "",
    tokenType: "",
    image: "",
    username: "",
  },
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      console.log("check action", action);

      return {
        ...state,
        account: {
          id: action?.payload?.id,
          message: action?.payload?.message,
          refresh_token: action?.payload?.refresh_token,
          roles: action?.payload?.roles,
          token: action?.payload?.token,
          tokenType: action?.payload?.tokenType,
          image: action?.payload?.image,
          username: action?.payload?.username,
        },
        isAuthenticated: true,
      };

    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

export default userReducer;
