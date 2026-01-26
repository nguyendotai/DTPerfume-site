export const formatPrice = (value?: string | number) => {
  if (value === undefined || value === null) return "0đ";
  return Number(value).toLocaleString("vi-VN") + "đ";
  
};
