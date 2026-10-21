// ฟังก์ชันแปลงสกุลเงิน USD เป็น THB (อัตราแลกเปลี่ยนคงที่ 1 USD = 35 THB)
export const convertToTHB = (priceInUSD) => {
  const rate = 35;
  const thb = priceInUSD * rate;
  return thb.toLocaleString('th-TH', { style: 'currency', currency: 'THB' });
};

// ฟังก์ชันจัดรูปแบบ USD
export const formatUSD = (priceInUSD) => {
  return Number(priceInUSD).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};