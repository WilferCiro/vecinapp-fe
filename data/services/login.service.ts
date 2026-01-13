import { fetchClient } from "../client/fetch-client";
const endpoint = `${process.env.NEXT_PUBLIC_API_BACKEND_URL}`;

export interface LoginServiceProps {
  email: string;
  password: string;
}
export interface LoginServiceOutput {
  ok: boolean;
}

export async function loginService({
  email,
  password,
}: LoginServiceProps): Promise<LoginServiceOutput | null> {
  const response = await fetchClient<LoginServiceProps, LoginServiceOutput | null>({
    endpoint: endpoint + `/auth/login`,
    method: "POST",
    credentials: "include",
    body: {
      email,
      password,
    },
  });
  if (!response?.ok) {
    throw new Error('Error al iniciar sesión')
  }

  return response;
}

export async function logoutService(): Promise<LoginServiceOutput | null> {
  const response = await fetchClient<null, LoginServiceOutput | null>({
    endpoint: endpoint + `/auth/logout`,
    method: "POST",
    body: null,
    credentials: "include",
  });
  if (!response?.ok) {
    throw new Error('Error al cerrar sesión')
  }

  return response;
}