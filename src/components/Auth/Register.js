import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { postRegister } from "../../services/apiService";
import { toast } from "react-toastify";

const Register = (props) => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [facebookAccountId, setFacebookAcconutId] = useState("");
  const [googleAccountId, setGoogleAccountId] = useState("");
  const [roleId, setRoleId] = useState("");

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errorPhoneNumber, setErrorPhoneNumber] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorRetypePassword, setErrorRetypePassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    // Kiểm tra phoneNumber
    if (!phoneNumber || phoneNumber.length <= 6) {
      setErrorPhoneNumber("Phone number must be more than 6 characters");
      return;
    } else {
      setErrorPhoneNumber("");
    }

    if (!password) {
      setErrorPassword("Password is required");
      return;
    } else {
      setErrorPassword("");
    }

    if (password !== retypePassword) {
      setErrorRetypePassword(
        "Your password and confirmation password do not match."
      );
      return;
    } else {
      setErrorRetypePassword("");
    }

    console.log("Role ID:", roleId);
    console.log("phoneNumber", phoneNumber);

    let data = await postRegister(
      fullName,
      phoneNumber,
      address,
      password,
      retypePassword,
      dateOfBirth,
      facebookAccountId,
      googleAccountId,
      roleId
    );

    if (data && data.id) {
      console.log(">>>check", data);

      toast.success("Register successfully");
      navigate("/login");
    } else {
      setErrorPhoneNumber(data);
    }
  };

  return (
    <div className="register-container">
      <div className="header">
        <span>Already have an account?</span>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Log in
        </button>
      </div>

      <div className="title col-4 mx-auto">IAHSEA</div>

      <div className="welcome col-4 mx-auto">Start your journey</div>

      <div className="content-form col-4 mx-auto">
        <div className="form-group">
          <div className="form-group">
            <label>Fullname</label>
            <input
              type={"text"}
              className="form-control"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
          </div>

          <label>Phone number (*)</label>
          <input
            type={"text"}
            className="form-control"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </div>

        {errorPhoneNumber && (
          <div className="alert alert-danger">{errorPhoneNumber}</div>
        )}
        <div className="form-group pass-group">
          <label>Password (*)</label>
          <input
            type={isShowPassword ? "text" : "password"}
            className="form-control"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {isShowPassword ? (
            <span
              className="icons-eye"
              onClick={() => setIsShowPassword(false)}
            >
              <VscEye />
            </span>
          ) : (
            <span className="icons-eye" onClick={() => setIsShowPassword(true)}>
              <VscEyeClosed />
            </span>
          )}
        </div>
        {errorPassword && (
          <div className="alert alert-danger">{errorPassword}</div>
        )}

        <div className="form-group pass-group">
          <label>Retype Password (*)</label>
          <input
            type={isShowPassword ? "text" : "password"}
            className="form-control"
            value={retypePassword}
            onChange={(event) => setRetypePassword(event.target.value)}
          />
          {isShowPassword ? (
            <span
              className="icons-eye"
              onClick={() => setIsShowPassword(false)}
            >
              <VscEye />
            </span>
          ) : (
            <span className="icons-eye" onClick={() => setIsShowPassword(true)}>
              <VscEyeClosed />
            </span>
          )}
        </div>
        {errorRetypePassword && (
          <div className="alert alert-danger">{errorRetypePassword}</div>
        )}

        <div className="form-group">
          <label>Address</label>
          <input
            type={"text"}
            className="form-control"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date of Birth (*)</label>
          <input
            type={"date"}
            className="form-control"
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Facebook Account ID</label>
          <input
            type={"number"}
            className="form-control"
            value={facebookAccountId}
            onChange={(event) => setFacebookAcconutId(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Google Account ID</label>
          <input
            type={"number"}
            className="form-control"
            value={googleAccountId}
            onChange={(event) => setGoogleAccountId(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Role ID (*)</label>
          <input
            type={"text"}
            className="form-control"
            value={roleId}
            onChange={(event) => setRoleId(event.target.value)}
          />
        </div>

        {/* <div className="form-group">
          <label>Role (*)</label>
          <select
            className="form-control"
            value={roleId}
            onChange={(event) => setRoleId(parseInt(event.target.value, 10))}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
          </select>
        </div> */}

        <div>
          <button className="btn-submit" onClick={() => handleRegister()}>
            Create my free account
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
  );
};

export default Register;
