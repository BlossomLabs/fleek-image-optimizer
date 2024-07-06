import wasm from "@jsquash/jpeg/codec/dec/mozjpeg_dec.wasm";
import decode, { init } from "@jsquash/jpeg/decode";
export async function decodeImage(image: ArrayBuffer): Promise<ImageData> {
  await init(await (wasm as unknown as () => Promise<WebAssembly.Module>)());
  return await decode(image);
}
