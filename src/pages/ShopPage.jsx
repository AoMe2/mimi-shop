import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Loading from '../components/Loading';

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=7')
      .then((response) => {
        if (!response.ok) {
          throw new Error('ไม่สามารถดึงข้อมูลสินค้าได้ กรุณาลองใหม่อีกครั้ง');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="error-container">
        <h2>⚠️ เกิดข้อผิดพลาด</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="shop-page">
      <header className="shop-header">
        <h1>ยินดีต้อนรับสู่ Mini Shop</h1>
        <p>เลือกซื้อสินค้าคุณภาพดีในราคาสุดคุ้ม</p>
      </header>

      {products.length === 0 ? (
        <p className="empty-state">ไม่พบสินค้าในระบบ</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}