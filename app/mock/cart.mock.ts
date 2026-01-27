// ../mocks/cart.mock.ts
export const cartMock = {
  getCart: () => ({
    items: [],
    total: 0,
  }),
  addToCart: (payload: any) => ({
    message: "Đã thêm vào giỏ hàng",
    item: payload,
  }),
  updateItem: (item_id: number, quantity: number) => ({
    message: "Đã cập nhật",
    item_id,
    quantity,
  }),
  removeItem: (item_id: number) => ({
    message: "Đã xoá",
    item_id,
  }),
  clearCart: () => ({
    message: "Đã xoá toàn bộ giỏ hàng",
  }),
  sync: (items: any[]) => ({
    message: "Đồng bộ thành công",
    items,
  }),
};
