import { Outlet, Link } from "react-router-dom";
import "./Web.scss";
import Header from "./components/Header/Header";
import SubHeader from "./components/Header/SubHeader";

const Web = () => {
  return (
    <div className="web-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="sub-header-container">
        <SubHeader />
      </div>

      <Outlet />
    </div>
  );
};

export default Web;
