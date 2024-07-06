export type SupportedInputType = "png" | "jpeg" | "webp" | "avif";
export const supportedInputTypes: SupportedInputType[] = [
  "png",
  "jpeg",
  "webp",
  "avif",
];

export async function decodeImage(
  image: ArrayBuffer,
  type: SupportedInputType,
): Promise<ImageData> {
  let decodeImage: (image: ArrayBuffer) => Promise<ImageData>;
  switch (type) {
    case "png":
      ({ decodeImage } = await import("../lib/decode/png"));
      break;
    case "jpeg":
      ({ decodeImage } = await import("../lib/decode/jpeg"));
      break;
    case "webp":
      ({ decodeImage } = await import("../lib/decode/webp"));
      break;
    case "avif":
      ({ decodeImage } = await import("../lib/decode/avif"));
      break;
    default:
      throw new Error(`Unsupported image type: ${type}`);
  }
  return await decodeImage(image);
}
