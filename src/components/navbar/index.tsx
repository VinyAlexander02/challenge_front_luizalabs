import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

const pages = [
  { name: "Home", path: "/" },
  { name: "Vitrines", path: "/add-showcase" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const handleMenuClick = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button
          className="navbar-logo"
          onClick={() => navigate("/")}
          aria-label="Voltar para a página inicial"
        >
          MAGALU
        </button>

        <button className="navbar-toggle" onClick={toggleMenu}>
          ☰
        </button>

        <div className={`navbar-links ${menuOpen ? "active" : ""}`}>
          {pages.map((page) => (
            <button
              key={page.name}
              className="navbar-link"
              onClick={() => handleMenuClick(page.path)}
              data-testid={`page-name-${page.name}`}
            >
              {page.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
