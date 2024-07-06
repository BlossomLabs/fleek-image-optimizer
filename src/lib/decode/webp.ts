import wasm from "@jsquash/webp/codec/dec/webp_dec.wasm";
import decode, { init } from "@jsquash/webp/decode";
export async function decodeImage(image: ArrayBuffer): Promise<ImageData> {
  await init(await (wasm as unknown as () => Promise<WebAssembly.Module>)());
  return await decode(image);
}
