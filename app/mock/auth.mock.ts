// ../mocks/auth.mock.ts
export const authMock = {
  login: (email: string, password: string) => ({
    token: "mock-token",
    user: { id: 1, email, name: "Mock User" },
  }),
  register: (payload: any) => ({
    message: "Đăng ký thành công",
    user: { id: 2, ...payload },
  }),
  getMe: () => ({
    user: { id: 1, email: "mock@mail.com", name: "Mock User" },
  }),
  updateProfile: (payload: any) => ({
    message: "Cập nhật thành công",
    user: { id: 1, ...payload },
  }),
};
