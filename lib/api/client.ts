import { toast } from "sonner";

export async function apiFetch(path: string, options?: RequestInit) {
  const headers: Record<string, string> = {
    ...(options?.body instanceof FormData
      ? {}
      : { "Content-Type": "application/json" }),
    ...(options?.headers as Record<string, string>),
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${path}`, {
    ...options,
    headers,
  });

  let data;
  try {
    data = await response.json();
    console.log(data)
  } catch (error) {
    console.log(error)
    data = {};
  }

  if (response.status === 401 || data.statusCode === 401) {
    // if (typeof window !== "undefined") {
    //   window.location.href = "/signin";
    // }
    // throw new Error(data.message || "Unauthorized");
  }

  if (!response.ok) {
    // const message = data.message || "An error occurred";
    // toast.error(message);
    // throw new Error(message);
  }

  return data.data;
}
