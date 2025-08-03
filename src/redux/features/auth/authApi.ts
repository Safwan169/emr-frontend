// src/redux/features/auth/authApi.ts
import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔐 Login
    loginUser: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    verifyLoginOtp: builder.mutation({
      query: (payload: { otp_code: string }) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body: payload,
      }),
    }),

    resendLoginOtp: builder.mutation({
      query: (body: { email: string }) => ({
        url: "/auth/resend-login-otp",
        method: "POST",
        body,
      }),
    }),

    // 🔓 Logout
    logoutUser: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST", // or "GET" if your backend uses GET for logout
        credentials: "include", // required if logout relies on cookies/session
      }),
    }),

    // 📝 Registration
    signup: builder.mutation({
      query: (formData: any) => ({
        url: "/auth/register",
        method: "POST",
        body: formData,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (payload: { email: string; otp: string }) => ({
        url: "/auth/register/verify-otp",
        method: "POST",
        body: payload,
      }),
    }),

    resendRegisterOtp: builder.mutation({
      query: (body: { email: string }) => ({
        url: "/auth/register/resend-otp",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignupMutation,
  useVerifyOtpMutation,
  useVerifyLoginOtpMutation,
  useResendLoginOtpMutation,
  useResendRegisterOtpMutation,
  useLogoutUserMutation, // ✅ export logout hook
} = authApi;
