import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatUSD, convertToTHB } from '../utils/currency';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  return (
    <div className="product-card">
      {showToast && <div className="toast-notification">เพิ่มลงตะกร้าแล้ว!</div>}
      
      <Link to={`/product/${product.id}`} className="product-image-container">
        <img src={product.image} alt={product.title} className="product-image" />
      </Link>

      <div className="product-info">
        <Link to={`/product/${product.id}`} className="product-title-link">
          <h3 className="product-title" title={product.title}>{product.title}</h3>
        </Link>
        <div className="product-prices">
          <span className="price-usd">{formatUSD(product.price)}</span>
          <span className="price-thb">({convertToTHB(product.price)})</span>
        </div>

        <button className="btn-add-cart" onClick={handleAddToCart}>
          เพิ่มลงตะกร้า
        </button>

      </div>
    </div>
  );
}