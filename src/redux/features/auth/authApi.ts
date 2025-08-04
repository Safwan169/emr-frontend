// src/redux/features/auth/authApi.ts
import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 🔐 Login
    loginUser: builder.mutation({
      query: (userInfo) => ({
        url: "/Auth/Login",
        method: "POST",
        body: userInfo,
      }),
    }),

    verifyLoginOtp: builder.mutation({
      query: (payload: { otp_code: string }) => ({
        url: "/Auth/VerifyOTP",
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
        url: "/Auth/Logout",
        method: "POST", // or "GET" if your backend uses GET for logout
        credentials: "include", // required if logout relies on cookies/session
      }),
    }),

    // 📝 Registration
    signup: builder.mutation({
      query: (formData: any) => ({
        url: "/Auth/Register",
        method: "POST",
        body: formData,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (payload: { email: string; otp: string }) => ({
        url: "/Auth/Register/VerifyOTP",
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
