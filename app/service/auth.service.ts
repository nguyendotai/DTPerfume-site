import {
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
} from "../types/auth";
import { authMock } from "../mock/auth.mock"; 

const AUTH_ENDPOINT = "/auth";

/* LOGIN */
export const loginService = async (payload: LoginPayload) => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return authMock.login(payload.email, payload.password);
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${AUTH_ENDPOINT}/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include", // 🔥 QUAN TRỌNG
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.message || "Đăng nhập thất bại!");

    return data;
  }
};

/* REGISTER */
export const registerService = async (payload: RegisterPayload) => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return authMock.register(payload);
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${AUTH_ENDPOINT}/register`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.message || "Đăng ký thất bại!");

    return data;
  }
};

/* GET ME */
export const getMeService = async () => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return authMock.getMe();
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${AUTH_ENDPOINT}/me`,
      {
        method: "GET",
        credentials: "include", // 🔥 QUAN TRỌNG
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || data.message || "Lấy thông tin thất bại!");

    return data;
  }
};

/* UPDATE PROFILE */
export const updateProfileService = async (
  payload: UpdateProfilePayload
) => {
  if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
    return authMock.updateProfile(payload);
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${AUTH_ENDPOINT}/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        credentials: "include", // 🔥 QUAN TRỌNG
      }
    );

    const data = await res.json();
    if (!res.ok)
      throw new Error(data.error || data.message || "Cập nhật thất bại!");

    return data;
  }
};

/* LOGOUT */
export const logoutService = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${AUTH_ENDPOINT}/logout`,
    {
      method: "POST",
      credentials: "include", 
    }
  );

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Logout thất bại!");

  return data;
};