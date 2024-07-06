import { optimize } from "./optimize";

type RequestObject = {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | "HEAD";
  headers?: {
    [key: string]: string;
  } | null;
  path: string;
  query?: {
    [key: string]: string | string[];
  } | null;
  body?: string | null;
};

export async function main(params: RequestObject) {
  try {
    return optimize(processParams(params), check)
  } catch (error) {
    if (isErrorWithStatusAndBody(error)) {
      return error;
    }
    return {
      status: 500,
      body: "Internal Server Error",
    };
  }
}

// main({
//   method: 'GET',
//   path: '/https://cloudinary-marketing-res.cloudinary.com/image/upload/landmannalaugar_iceland.jpg/',
//   headers: {
//     accept: 'image/avif'
//   },
//   query: {
//     w: '100'
//   }
// })

function isErrorWithStatusAndBody(
  error: unknown,
): error is { status: number; body: string } {
  const err = error as { [key: string]: unknown };
  return (
    err &&
    typeof err === "object" &&
    typeof err.status === "number" &&
    typeof err.body === "string"
  );
}

function check(condition: boolean, status: number, message: string) {
  if (condition)
    throw {
      status: status,
      body: message,
    };
}

function processParams(params: RequestObject) {
  const { method, path, headers, query } = params;
  let url = path.startsWith("/") && path.length > 1 ? path.slice(1) : path;
  if (url.endsWith("/")) {
    url = url.slice(0, -1);
  }
  const width: number | undefined = query?.w
    ? Number.parseInt(String(query?.w))
    : undefined;

  const to: string | undefined = query?.to && !Array.isArray(query?.to) ? query?.to : undefined;

  check(method !== "GET", 405, "Method Not Allowed");
  check(!url, 400, "Invalid URL");
  check(width !== undefined && Number.isNaN(width), 400, "Invalid width");

  const acceptsAvif = headers?.accept?.includes("image/avif") || false;
  const acceptsWebp = headers?.accept?.includes("image/webp") || false;
  return { url, width, acceptsAvif, acceptsWebp, to };
}
