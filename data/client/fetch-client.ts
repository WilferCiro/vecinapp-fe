import { AppErrorMessages } from "../errors/error-codes";

interface FetchClientProps<T> {
  endpoint: string;
  method: "POST" | "GET" | "PATCH" | "DELETE";
  body?: T;
  params?: Record<string, string>;
  isFile?: boolean;
  fileName?: string;
  customHeaders?: { [key: string]: string };
  credentials?: RequestCredentials;
}

export const fetchClient = async <T, U>({
  endpoint,
  method,
  body,
  params,
  isFile,
  fileName,
  customHeaders,
  credentials,
}: FetchClientProps<T>): Promise<U | null> => {
  const headers: [string, string][] | Record<string, string> | Headers = {
    "Content-Type": "application/json",
    ...(customHeaders || {}),
  };
  let newEndpoint = endpoint;
  if (params) {
    newEndpoint = `${endpoint}` + "?" + new URLSearchParams(params).toString();
  }
  try {
    const response = await fetch(`${newEndpoint}`, {
      method,
      body: JSON.stringify(body),
      headers,
      ...(credentials ? { credentials } : {}),
    });
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json?.appCode);
    }
    if (isFile) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName || "file");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return null;
    }
    const json = await response.json();
    return json;
  } catch (e: any) {
    const code = e?.message;
    console.log(e);
    throw new Error(
      AppErrorMessages[code as keyof typeof AppErrorMessages] ||
        "Error Realizando la petición"
    );
  }
};
