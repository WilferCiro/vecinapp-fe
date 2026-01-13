import { MeResponse } from "@/domain/types/user.type";
import { fetchClient } from "../client/fetch-client";
const endpoint = `${process.env.NEXT_PUBLIC_API_BACKEND_URL}`;

export async function meService(): Promise<MeResponse | null> {
  const response = await fetchClient<null, MeResponse | null>({
    endpoint: endpoint + `/user/me`,
    method: "GET",
    credentials: "include",
  });

  return response;
}