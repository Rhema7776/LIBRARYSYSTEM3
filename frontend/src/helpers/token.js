// src/helpers/token.js
import { jwtDecode } from "jwt-decode";

export function isTokenExpired(token) {
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token);
    if (!exp) return true;

    const currentTime = Date.now() / 1000; // in seconds
    return exp < currentTime;
  } catch (err) {
    return true; // invalid token is considered expired
  }
}
