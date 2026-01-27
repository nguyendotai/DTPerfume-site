// ../mocks/favorite.mock.ts
export const favoriteMock = {
  getFavorite: () => ({
    items: [],
  }),
  addToFavorite: (payload: any) => ({
    message: "Đã thêm vào yêu thích",
    item: payload,
  }),
  removeItem: (item_id: number) => ({
    message: "Đã xoá khỏi yêu thích",
    item_id,
  }),
  clear: () => ({
    message: "Đã xoá toàn bộ yêu thích",
  }),
  sync: (items: any[]) => ({
    message: "Đồng bộ yêu thích thành công",
    items,
  }),
};
