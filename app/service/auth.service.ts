import { USE_MOCK, BASE_API_URL } from "../lib/api.config";
import { readMockClient } from "../lib/mock.client";
import {
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
} from "../types/auth";

const AUTH_ENDPOINT = "/auth";

/* LOGIN */
export async function loginService(payload: LoginPayload) {
  if (USE_MOCK) {
    return readMockClient("auth-login.json");
  }

  const res = await fetch(`${BASE_API_URL}${AUTH_ENDPOINT}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

/* REGISTER */
export async function registerService(payload: RegisterPayload) {
  if (USE_MOCK) {
    return readMockClient("auth-register.json");
  }

  const res = await fetch(`${BASE_API_URL}${AUTH_ENDPOINT}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

/* GET ME */
export async function getMeService(token: string) {
  if (USE_MOCK) {
    return readMockClient("auth-me.json");
  }

  const res = await fetch(`${BASE_API_URL}${AUTH_ENDPOINT}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}

/* UPDATE PROFILE */
export async function updateProfileService(
  payload: UpdateProfilePayload,
  token: string
) {
  if (USE_MOCK) {
    return readMockClient("auth-update.json");
  }

  const res = await fetch(`${BASE_API_URL}${AUTH_ENDPOINT}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error((await res.json()).message);
  return res.json();
}
