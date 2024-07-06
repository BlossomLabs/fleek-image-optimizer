import { decodeImage } from "./decodeImage";
import { resizeImage } from "./resizeImage";
import { encodeImage } from "./encodeImage";

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

function check(condition: boolean, status: number, message: string) {
  if (condition)
    throw {
      status: status,
      body: message,
    };
}

export async function main(params: RequestObject) {
  try {
    const { method, path, headers, query } = params;
    let url = path.startsWith("/") && path.length > 1 ? path.slice(1) : path;
    if (url.endsWith("/")) {
      url = url.slice(0, -1);
    }
    const w: number | undefined = query?.w
      ? parseInt(String(query?.w))
      : undefined;

    check(method !== "GET", 405, "Method Not Allowed");
    check(!url, 400, "Invalid URL");
    check(w !== undefined && isNaN(w), 400, "Invalid width");

    const response = await fetch(url);

    check(!response.ok, 502, "Failed to fetch image");

    const contentType = response.headers.get("content-type");

    check(
      !contentType || !contentType.startsWith("image/"),
      415,
      "Unsupported Media Type",
    );

    const image = await response.arrayBuffer();
    console.log(`Image type: ${contentType}`);

    const fromFormat = contentType!.split("/")[1];

    const acceptsAvif = headers?.accept?.includes("image/avif") && false; // TODO Add support in the future
    const acceptsWebp = headers?.accept?.includes("image/webp");

    const toFormat = acceptsAvif ? "avif" : acceptsWebp ? "webp" : fromFormat;

    const availableOutFormats = ["avif", "webp"] as const; // This list can grow in the future

    // If we can't re-encode the image, it is better to return it without modifications
    if (
      !availableOutFormats.includes(
        toFormat as (typeof availableOutFormats)[number],
      )
    ) {
      return image;
    }

    const decoded = await decodeImage(image);
    console.log(
      `Original image dimensions: ${decoded.height}x${decoded.width}`,
    );

    const processed =
      w != undefined && w !== decoded.width
        ? await resizeImage(decoded, w)
        : decoded;
    console.log(
      `Resized image dimensions: ${processed.height}x${processed.width}`,
    );

    const encoded = await encodeImage(processed, toFormat as (typeof availableOutFormats)[number]);
    console.log(
      `Original image size: ${image.byteLength.toLocaleString()} bytes`,
    );
    console.log(
      `Encoded image size:  ${encoded.byteLength.toLocaleString()} bytes`,
    );
    console.log(
      `Improvement: ~${Math.round(
        ((image.byteLength - encoded.byteLength) / image.byteLength) * 100,
      )}%`,
    );
    return encoded;
  } catch (error) {
    return error;
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
