import { useState } from "react";
import type { FormEvent } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const menuList: string[] = ["Coffee", "Subscriptions", "Our Story"];

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchTerm.trim();
    navigate(query ? `/?search=${encodeURIComponent(query)}` : "/");
  };

  return (
    <header className="navbar">
      {/* Login */}
      <button className="login-button" type="button" onClick={() => navigate("/login")}>
        <FontAwesomeIcon icon={faUser} />
        <span>Login</span>
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
          {menuList.map((menu, index) => (
            <li key={index}>{menu}</li>
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
