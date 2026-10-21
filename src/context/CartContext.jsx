import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // โหลดข้อมูลตะกร้าจาก localStorage เมื่อเริ่มแอป
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('mini_shop_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  // บันทึกตะกร้าลง localStorage ทุกครั้งที่ cart เปลี่ยนแปลง
  useEffect(() => {
    try {
      localStorage.setItem('mini_shop_cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  // เพิ่มสินค้าเข้าตะกร้า (ถ้ามีแล้วให้เพิ่ม quantity)
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // ลบสินค้าออกจากตะกร้า
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // เพิ่มจำนวนสินค้า
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // ลดจำนวนสินค้า (ต้องไม่ต่ำกว่า 1)
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // ล้างตะกร้าทั้งหมด
  const clearCart = () => {
    setCart([]);
  };

  // จำนวนสินค้ารวมทั้งหมด
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ราคารวมทั้งหมดเป็น USD
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};