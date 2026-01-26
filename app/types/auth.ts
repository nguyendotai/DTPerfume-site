/* ================= PAYLOAD ================= */
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

export interface UpdateProfilePayload {
  name?: string;
  email?: string;
  phone?: string;
}

/* ================= USER ================= */
export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
  createdAt?: string;
}
