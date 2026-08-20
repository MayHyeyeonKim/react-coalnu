import { useState } from "react";
import type { FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useNavigate } from "react-router-dom";

interface NavbarProps {
  authenticate: boolean;
  setAuthenticate: (authenticate: boolean) => void;
}

const Navbar = ({ authenticate, setAuthenticate }: NavbarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const menuList = [
    { label: "Coffee", path: "/" },
    { label: "Subscriptions", path: "/subscriptions" },
    { label: "Our Story", path: "/our-story" },
  ];

  const handleLogin = () => {
    if (authenticate) {
      setAuthenticate(false);
    } else {
      navigate("/login");
    }
  };

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim();
    navigate(query ? `/?search=${encodeURIComponent(query)}` : "/");
  };

  return (
    <header className="site-navbar">
      {/* Login */}
      <button className="login-button" type="button" onClick={handleLogin}>
        <FontAwesomeIcon icon={faUser} />
        <span>{authenticate ? "Logout" : "Login"}</span>
      </button>

      {/* Logo */}
      <Link className="logo" to="/">
        <span className="coffee-bean">
          <span />
        </span>
        <span className="logo-text">
          <strong>COFFEE BEAN</strong>
          <small>ROASTERS &amp; GOODS</small>
        </span>
      </Link>

      {/* Menu */}
      <div className="menu">
        <ul>
          {menuList.map((menu) => (
            <li key={menu.path}>
              <NavLink to={menu.path} end={menu.path === "/"}>
                {menu.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Search */}
      <form className="search" onSubmit={handleSearch}>
        <input
          id="product-search"
          type="search"
          placeholder="Search coffee beans"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </header>
  );
};

export default Navbar;
