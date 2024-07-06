import wasm from "@jsquash/avif/codec/enc/avif_enc.wasm";
import encode, { init } from "@jsquash/avif/encode";

export async function encodeImage(processed: ImageData) {
  await init(await wasm());
  return await encode(processed);
}
