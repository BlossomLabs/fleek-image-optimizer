export type SupportedOutputType = "webp" | "avif";
export const supportedOutputTypes: SupportedOutputType[] = ["webp", "avif"];

export async function encodeImage(
  image: ImageData,
  type: SupportedOutputType,
): Promise<ArrayBuffer> {
  let encodeImage: (image: ImageData) => Promise<ArrayBuffer>;
  switch (type) {
    case "webp":
      ({ encodeImage } = await import("../lib/encode/webp"));
      break;
    case "avif":
      ({ encodeImage } = await import("../lib/encode/avif"));
      break;
    default:
      throw new Error(`Unsupported image type: ${type}`);
  }
  return await encodeImage(image);
}
