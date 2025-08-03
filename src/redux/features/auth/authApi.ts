// src/redux/features/auth/authApi.ts
import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
});

export const {
  useLoginUserMutation,
  useSignupMutation,
  useVerifyOtpMutation,
  useVerifyLoginOtpMutation, // export this hook
} = authApi;
