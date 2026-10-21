import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <h2>404 - ไม่พบหน้าที่คุณต้องการ</h2>
      <p>ขออภัย หน้าที่คุณกำลังค้นหาไม่มีอยู่จริง หรืออาจถูกย้ายไปแล้ว</p>
      <Link to="/" className="btn-primary">
        กลับสู่หน้าแรก
      </Link>
    </div>
  );
}