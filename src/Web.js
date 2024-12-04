import { Outlet, Link, useNavigate } from "react-router-dom";
import "./Web.scss";
import Header from "./components/Header/Header";
import SubHeader from "./components/Header/SubHeader";
import { useState, useEffect } from "react";

const Web = () => {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 10) {
        // Nếu cuộn xuống
        setIsScrollingDown(true);
      } else if (currentScrollY < lastScrollY) {
        // Nếu cuộn lên
        setIsScrollingDown(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // // Kiểm tra token
  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");

  //   if (!token) {
  //     // Nếu không có token, chuyển hướng đến trang login
  //     navigate("/login");
  //   } else {
  //     // Kiểm tra xem token có hợp lệ không
  //     const isTokenExpired = () => {
  //       try {
  //         const decodedToken = JSON.parse(atob(token.split(".")[1]));
  //         const expirationTime = decodedToken.exp * 1000;
  //         return Date.now() > expirationTime;
  //       } catch (error) {
  //         return true; // Nếu token không hợp lệ, coi như hết hạn
  //       }
  //     };
  //     if (isTokenExpired()) {
  //       localStorage.removeItem("authToken");
  //       localStorage.removeItem("refreshToken");
  //       navigate("/login");
  //     }
  //   }
  // }, [navigate]);

  return (
    <div className="web-container">
      <div className={`header-container ${isScrollingDown ? "hidden" : ""}`}>
        <Header />
      </div>

      <div
        className={`sub-header-container ${isScrollingDown ? "visible" : ""}`}
      >
        <SubHeader />
      </div>

      <Outlet />
    </div>
  );
};

export default Web;
