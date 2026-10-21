import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🛍️ Mini Shop
        </Link>
        <div className="navbar-links">
          <Link to="/" className="nav-item">หน้าแรก</Link>
          <Link to="/cart" className="nav-item cart-link">
            🛒 ตะกร้าสินค้า
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}