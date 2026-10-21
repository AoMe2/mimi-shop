import React from 'react';

export default function Loading() {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>กำลังโหลดข้อมูลสินค้า...</p>
    </div>
  );
}