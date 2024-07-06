import wasm from "@jsquash/avif/codec/dec/avif_dec.wasm";
import decode, { init } from "@jsquash/avif/decode";
export async function decodeImage(image: ArrayBuffer): Promise<ImageData> {
  await init(await (wasm as unknown as () => Promise<WebAssembly.Module>)());
  return await decode(image);
}
