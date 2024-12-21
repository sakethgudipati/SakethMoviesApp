import { Link } from "react-router-dom";
import ExpandableSearch from "../ExpandableSearch";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import "./index.css";

const Navbar = () => {
  const navbarRef = useRef(null); // Ref for the navbar element

  useEffect(() => {
    const handleScroll = () => {
      // Only execute logic if navbarRef.current is set
      if (navbarRef.current) {
        if (window.scrollY > 0) {
          navbarRef.current.classList.add("scrolled");
        } else {
          navbarRef.current.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigate = useNavigate();

  const onClickLogo = () => {
    navigate('/');
  }

  return (
    <nav
      ref={navbarRef} // Attach the ref here
      className="navbar-style navbar navbar-dark navbar-expand-lg"
    >
      <div className="container-fluid nav-responsive-style">
        <img
          src="https://res.cloudinary.com/defacaof3/image/upload/v1730194589/Group_7399.png"
          className="navbar-logo"
          alt="logo"
          onClick={onClickLogo}
        />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav ms-auto">
            <ExpandableSearch />
            <Link to="/" className="nav-link text text-light mr-2">
              <p className="me-4">Home</p>
            </Link>
            <Link to="/Popular" className="nav-link text text-light mr-2">
              <p className="me-4">Popular</p>
            </Link>
            <Link to="/account">
              <img
                src="https://res.cloudinary.com/defacaof3/image/upload/v1730277958/Avatar.png"
                className="me-2"
                alt="Account"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




