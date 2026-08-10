import React, { useState } from "react";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

const Navbar = ({ authenticate, setAuthenticate }) => {
  const menuList = [
    "여성",
    "Divided",
    "남성",
    "신생아/유아",
    "아동",
    "H&M Home",
    "Sale",
    "지속가능성",
  ];
  let [width, setWidth] = useState(0);
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  const goToHome = () => {
    navigate("/");
  };

  const search = (event) => {
    if (event.key === "Enter") {
      let keyword = event.target.value;
      // console.log(keyword)
      navigate(`/?q=${keyword}`);
    }
  };
  return (
    <div>
      <div className="hamberger-login">
        <div className="side-menu" style={{ width: width }}>
          <button className="closebtn" onClick={() => setWidth(0)}>
            &times;
          </button>
          <div className="side-menu-list" id="menu-list">
            {menuList.map((menu, index) => (
              <button key={index}>{menu}</button>
            ))}
          </div>
        </div>
        <div className="nav-header">
          <div className="burger-menu hide">
            <FontAwesomeIcon icon={faBars} onClick={() => setWidth(250)} />
          </div>
          {authenticate ? (
            <div onClick={() => setAuthenticate(false)}>
              <FontAwesomeIcon icon={faUser} />
              <span style={{ cursor: "pointer" }}>로그아웃</span>
            </div>
          ) : (
            <div onClick={() => navigate("/login")}>
              <FontAwesomeIcon icon={faUser} />
              <span style={{ cursor: "pointer" }}>로그인</span>
            </div>
          )}
        </div>
      </div>

      <div className="nav-section">
        <img
          width={100}
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg"
          alt="logo"
          onClick={goToHome}
          style={{ cursor: "pointer" }}
        />
      </div>

      <div className="menu-area">
        <ul className="menu-list">
          {menuList.map((menu) => (
            <li>{menu}</li>
          ))}
        </ul>
        <div className="search-area">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            onKeyPress={(event) => {
              search(event);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
