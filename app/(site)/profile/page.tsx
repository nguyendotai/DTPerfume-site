"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { getMeThunk, updateProfileThunk } from "@/app/store/thunks/auth.thunk";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const dispatch = useDispatch<any>();
  const { user, token, loading } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(getMeThunk(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await dispatch(updateProfileThunk(form)).unwrap();
      toast.success("Hồ sơ đã được cập nhật thành công", {
        style: {
          background: "#ffffff",
          color: "#b45309",
          border: "1px solid #d4af37",
          boxShadow: "0 4px 12px rgba(180, 83, 9, 0.1)",
        },
      });
      setEditing(false);
    } catch (err: any) {
      toast.error(err.message || "Cập nhật thất bại", {
        style: {
          background: "#ffffff",
          color: "#dc2626",
          border: "1px solid #dc2626",
          boxShadow: "0 4px 12px rgba(220, 38, 38, 0.1)",
        },
      });
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-light tracking-wide text-amber-800 mb-4">
            Vui lòng đăng nhập
          </h2>
          <p className="text-gray-600">
            Bạn cần đăng nhập để xem và quản lý thông tin cá nhân.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 py-16 px-6">
      <div className="mx-auto max-w-3xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light tracking-widest uppercase text-amber-950">
            Hồ sơ cá nhân
          </h1>
          <div className="mt-4 h-px w-32 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent mx-auto" />
        </header>

        <div className="bg-white border border-gray-200/80 rounded-2xl shadow-xl shadow-amber-100/30 p-10 md:p-12">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <p className="mt-4 text-gray-500">Đang tải thông tin...</p>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Avatar / Greeting */}
              <div className="flex flex-col items-center text-center pb-8 border-b border-gray-200">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-600 to-amber-400 flex items-center justify-center text-4xl font-light text-white shadow-lg mb-4 ring-2 ring-amber-200/50">
                  {form.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <h2 className="text-3xl font-light text-amber-900">
                  {form.name || "Khách hàng thân thiết"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
              </div>

              {/* Form Fields */}
              <div className="space-y-8">
                {/* Name */}
                <div>
                  <label className="block mb-2 text-sm font-light tracking-wide text-gray-600 uppercase">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full bg-white border border-gray-300 rounded-lg px-5 py-4 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100/50 outline-none transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm font-light tracking-wide text-gray-600 uppercase">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full bg-white border border-gray-300 rounded-lg px-5 py-4 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100/50 outline-none transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block mb-2 text-sm font-light tracking-wide text-gray-600 uppercase">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    disabled={!editing}
                    className="w-full bg-white border border-gray-300 rounded-lg px-5 py-4 text-gray-900 placeholder-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-100/50 outline-none transition-all duration-300 disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Read-only Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-gray-200 text-sm">
                  <div>
                    <span className="block text-gray-500 uppercase tracking-wide text-xs mb-1">
                      Vai trò
                    </span>
                    <span className="text-amber-700 font-medium">
                      {user?.role === "admin"
                        ? "Quản trị viên"
                        : user?.role === "user"
                        ? "Khách hàng"
                        : user?.role || "—"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-gray-500 uppercase tracking-wide text-xs mb-1">
                      Thành viên từ
                    </span>
                    <span className="text-amber-700 font-medium">
                      {user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("vi-VN", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        : "—"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                {!editing ? (
                  <button
                    onClick={() => setEditing(true)}
                    className="flex-1 py-4 px-8 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-light tracking-widest uppercase rounded-xl transition-all duration-500 shadow-md hover:shadow-amber-300/40 hover:scale-[1.02]"
                  >
                    Chỉnh sửa hồ sơ
                  </button>
                ) : (
                  <>
                    <button
                      onClick={handleSubmit}
                      className="flex-1 py-4 px-8 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-light tracking-widest uppercase rounded-xl transition-all duration-500 shadow-md hover:shadow-emerald-300/40 hover:scale-[1.02]"
                    >
                      Lưu thay đổi
                    </button>
                    <button
                      onClick={() => {
                        setEditing(false);
                        if (user) {
                          setForm({
                            name: user.name || "",
                            email: user.email || "",
                            phone: user.phone || "",
                          });
                        }
                      }}
                      className="flex-1 py-4 px-8 border border-gray-300 hover:bg-gray-50 text-gray-700 font-light tracking-widest uppercase rounded-xl transition-all duration-500 hover:scale-[1.02]"
                    >
                      Hủy
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-12">
          DT Perfume – Nơi lưu giữ những mùi hương đẳng cấp
        </p>
      </div>
    </div>
  );
}