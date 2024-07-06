import wasm from "@jsquash/png/codec/squoosh_png_bg.wasm";
import decode, { init } from "@jsquash/png/decode";
export async function decodeImage(image: ArrayBuffer): Promise<ImageData> {
  await init(await (wasm as unknown as () => Promise<WebAssembly.Module>)());
  return await decode(image);
}
