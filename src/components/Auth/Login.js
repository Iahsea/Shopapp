import { useContext, useEffect, useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin, postRefreshToken } from "../../services/apiService";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { doLogin } from "../../redux/action/userAction";
import { CartContext } from "../../contexts/CartContext";

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn, setIsLoggedIn } = useContext(CartContext);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (token) {
      navigate("/"); // Điều hướng đến trang chủ nếu có token hợp lệ
    }
    if (isTokenExpired(token)) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const data = await postLogin(phoneNumber, password);
      console.log(">>> check data", data);
      if (data && data.token && data.refresh_token) {
        const { token, refresh_token, message } = data;
        localStorage.setItem("authToken", token);
        localStorage.setItem("refreshToken", refresh_token);
        setIsLoggedIn(true);
        toast.success(message);

        dispatch(doLogin(data));
        navigate("/");
      } else {
        const { message } = data;
        toast.error(message);
      }
    } catch (error) {
      console.error(">>>Login error:", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const isTokenExpired = (token) => {
    if (!token) return true;

    const decodedToken = JSON.parse(atob(token.split(".")[1])); // Giải mã JWT
    const expirationTime = decodedToken.exp * 1000; // Thời gian hết hạn (millisecond)

    console.log(">>>>> check decodedToken", decodedToken);

    return Date.now() > expirationTime; // Kiểm tra hết hạn
  };

  const handleKeyDown = (event) => {
    if (event && event.key === "Enter") {
      handleLogin();
    }
  };

  // const handleRefreshToken = async () => {
  //   const refreshToken = localStorage.getItem("refreshToken");
  //   console.log(">>> check refresh Token", refreshToken);

  //   if (!refreshToken) {
  //     toast.error("No refresh token available");
  //     navigate("/");
  //     return;
  //   }

  //   try {
  //     const response = await postRefreshToken(refreshToken);
  //     if (response && response.token && response.refreshToken) {
  //       console.log(">>> check response", response);

  //       const { token, refreshToken: newRefreshToken } = response;
  //       localStorage.setItem("authToken", token);
  //       localStorage.setItem("refreshToken", newRefreshToken);

  //       toast.success("Token refresh successfully");

  //       return token;
  //     }
  //   } catch (error) {
  //     console.log("Failed to refresh token", error);
  //     toast.error("Failed to refresh token");
  //     navigate("/login");
  //   }
  // };

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   console.log(">>> check check tokennnn", token);

  //   // if (!token) {
  //   handleRefreshToken();
  //   // }
  // }, []);

  return (
    <div className="login-container">
      <div className="header">
        <span>Don't have an account yet ?</span>
        <button
          onClick={() => {
            navigate("/register");
          }}
        >
          Sign up
        </button>
      </div>

      <div className="wrapper-container">
        <div className="title col-4 mx-auto">IAHSEA</div>

        <div className="content-form col-4 mx-auto">
          <div className="form-group">
            {/* <label>Phone number</label> */}
            <input
              type={"text"}
              placeholder="Phone number"
              className="form-control"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type={"password"}
              placeholder="Password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              onKeyDown={(event) => handleKeyDown(event)}
            />
          </div>

          <span>Forgot password ?</span>
          <div>
            <button className="btn-submit" onClick={() => handleLogin()}>
              <span>Login to Iahsea</span>
            </button>
          </div>
          <div className="text-center">
            <span
              className="back"
              onClick={() => {
                navigate("/");
              }}
            >
              &#60;&#60; Go to Homepage
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
