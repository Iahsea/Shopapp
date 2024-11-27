import { useEffect, useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../services/apiService";

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Kiểm tra token khi component Login được render
  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (token) {
  //     navigate("/"); // Nếu có token, điều hướng ngay đến trang homepage
  //   }
  // }, [navigate]);

  const handleLogin = async () => {
    let data = await postLogin(phoneNumber, password);
    console.log(">>> check", data);
    let token = data;
    localStorage.setItem("authToken", token);
    if (token) {
      navigate("/");
    } else {
      // Optional: Giải mã JWT để kiểm tra nội dung
      const payload = JSON.parse(atob(token.split(".")[1]));
      console.log("Payload:", payload);
    }
  };

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
