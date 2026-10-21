import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatUSD, convertToTHB } from '../utils/currency';
import Loading from '../components/Loading';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('ไม่พบข้อมูลสินค้า');
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    }
  };

  if (loading) return <Loading />;
  if (error) return <div className="error-container"><p>{error}</p><Link to="/">กลับหน้าแรก</Link></div>;
  if (!product) return null;

  return (
    <div className="product-detail-page">
      {showToast && <div className="toast-notification">เพิ่มลงตะกร้าแล้ว!</div>}
      <Link to="/" className="back-link">← กลับสู่หน้าร้านค้า</Link>
      
      <div className="product-detail-container">
        <div className="product-detail-image-wrapper">
          <img src={product.image} alt={product.title} className="product-detail-image" />
        </div>
        <div className="product-detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.title}</h1>
          <div className="product-detail-prices">
            <span className="price-usd">{formatUSD(product.price)}</span>
            <span className="price-thb">({convertToTHB(product.price)})</span>
          </div>
          <p className="product-description">{product.description}</p>
          <button className="btn-add-cart-large" onClick={handleAddToCart}>
            เพิ่มลงตะกร้าสินค้า
          </button>
        </div>
      </div>
    </div>
  );
}