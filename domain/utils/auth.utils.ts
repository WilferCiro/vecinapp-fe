import { jwtDecode } from "jwt-decode";

interface PropsDecoded {
  exp: number;
  id: number;
}

export const checkIsAuth = (token?: string | null) => {
  if (!token) {
    return false;
  }
  try {
    const decoded: PropsDecoded | null = jwtDecode(token);
    if (decoded && Date.now() - decoded["exp"] < 0) {
      return true;
    }
  } catch {}
  return false;
};
