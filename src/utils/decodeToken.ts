// src/utils/decodeToken.ts
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  role_name?: string;
  email?: string;
  exp?: number;
  // Add more fields based on your token structure
}

export const decodeToken = (token: string | null): DecodedToken | null => {
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};
