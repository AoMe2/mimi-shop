import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { formatUSD, convertToTHB } from '../utils/currency';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const handleCheckout = () => {
    alert('🎉 สั่งซื้อสินค้าสำเร็จ ขอบคุณที่ใช้บริการ!');
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h2>🛒 ตะกร้าสินค้าของคุณว่างเปล่า</h2>
        <p>ยังไม่มีสินค้าในตะกร้าของคุณ ลองเลือกซื้อสินค้าก่อนนะ</p>
        <Link to="/" className="btn-primary">
          กลับไปเลือกซื้อสินค้า
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>ตะกร้าสินค้าของคุณ ({totalItems} รายการ)</h2>

      <div className="cart-container">
        <div className="cart-items-list">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h4>{item.title}</h4>
                <p className="cart-item-price">
                  {formatUSD(item.price)} / ชิ้น
                </p>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-subtotal">
                  <p className="subtotal-usd">{formatUSD(item.price * item.quantity)}</p>
                  <p className="subtotal-thb">({convertToTHB(item.price * item.quantity)})</p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="btn-remove"
                >
                  ลบ
                </button>
              </div>
            </div>
          ))}

          <div className="cart-actions-bottom">
            <button onClick={clearCart} className="btn-clear">
              ล้างตะกร้าทั้งหมด
            </button>
          </div>
        </div>

        <div className="cart-summary">
          <h3>สรุปคำสั่งซื้อ</h3>
          <div className="summary-row">
            <span>จำนวนสินค้ารวม:</span>
            <span>{totalItems} ชิ้น</span>
          </div>
          <div className="summary-row">
            <span>ราคารวม (USD):</span>
            <span className="summary-value">{formatUSD(totalPrice)}</span>
          </div>
          <div className="summary-row">
            <span>ราคารวม (THB):</span>
            <span className="summary-value">{convertToTHB(totalPrice)}</span>
          </div>
          <button onClick={handleCheckout} className="btn-checkout">
            ชำระเงิน (Checkout)
          </button>
        </div>
      </div>
    </div>
  );
}