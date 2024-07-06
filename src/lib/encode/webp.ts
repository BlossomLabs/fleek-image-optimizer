import wasm from "@jsquash/webp/codec/enc/webp_enc_simd.wasm";
import encode, { init } from "@jsquash/webp/encode";

export async function encodeImage(processed: ImageData, quality = 0.8) {
  await init(await wasm());
  return await encode(processed, { quality });
}
