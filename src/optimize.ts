import { decodeImage, supportedInputTypes } from "./actions/decodeImage";
import { resizeImage } from "./actions/resizeImage";
import { encodeImage, supportedOutputTypes } from "./actions/encodeImage";
import type { SupportedInputType } from "./actions/decodeImage";
import type { SupportedOutputType } from "./actions/encodeImage";

type Params = {
  url: string;
  width?: number;
  acceptsAvif: boolean;
  acceptsWebp: boolean;
  forceAvif: boolean;
};
type Check = (condition: boolean, status: number, message: string) => void;

export async function optimize(params: Params, check: Check) {
  const { url, width, acceptsWebp, forceAvif } = params;

  const response = await fetch(url);

  check(!response.ok, 502, `Failed to fetch image: ${url}`);

  const contentType = response.headers.get("content-type");

  check(
    !contentType || !contentType.startsWith("image/"),
    415,
    "Unsupported Media Type",
  );

  const image = await response.arrayBuffer();
  console.log(`Image type: ${contentType}`);

  const fromFormat = contentType?.split("/")[1] || "";
  const toFormat = forceAvif ? "avif" : acceptsWebp ? "webp" : fromFormat;

  // If we can't decode or re-encode the image, it is better to return it without modifications
  if (
    !supportedInputTypes.includes(fromFormat as SupportedInputType) ||
    !supportedOutputTypes.includes(toFormat as SupportedOutputType)
  ) {
    return image;
  }

  const decoded = await decodeImage(image, fromFormat as SupportedInputType);
  console.log(`Original image dimensions: ${decoded.height}x${decoded.width}`);

  const processed =
    width !== undefined && width !== decoded.width
      ? await resizeImage(decoded, width)
      : decoded;
  console.log(
    `Resized image dimensions: ${processed.height}x${processed.width}`,
  );

  const encoded = await encodeImage(processed, toFormat as SupportedOutputType);
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
}
