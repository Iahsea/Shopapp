import { Outlet, Link } from "react-router-dom";
import "./Web.scss";
import Header from "./components/Header/Header";
import SubHeader from "./components/Header/SubHeader";
import { useState, useEffect } from "react";

const Web = () => {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

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
