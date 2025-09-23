import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Search } from "../Search/Search";

import House from "../../public/icons/house-24.svg";
import Envelope from "../../public/icons/envelope-closed-24.svg";
import logo from "../../public/logo2.png";
import Phone from "../../public/icons/phone-42-32.svg";

import "./nav.css";

export const Nav = ({ handleSearch }) => {
  // console.log({ handleSearch });
  return (
    <div id="navContainer" className="nav-container">
      <div id="logoContainer" className="logo-container">
        <Link to="/about">
          <img
            id="logoImage"
            width="32"
            height="32"
            className=" logo-image"
            alt="logo"
            src={logo}
          />
        </Link>
      </div>
      <Search search="" handleSearch={handleSearch} />
      <div className="icons-container">
        <a href="tel:+381234567890">
          <img
            src={Phone}
            alt="Phone Icon"
            width="32"
            height="32"
            className="icon bar-icon"
          />
        </a>
        <Link to="/brush">
          <img
            src={House}
            alt="House Icon"
            width="32"
            height="32"
            className="icon bar-icon"
          />
        </Link>
        <a href="mailto:2455521@gmail.com">
          <img
            src={Envelope}
            alt="Envelope Icon"
            width="32"
            height="32"
            className="icon bar-icon"
          />
        </a>
      </div>
    </div>
  );
};
Nav.propTypes = {
  handleSearch: PropTypes.string,
};
