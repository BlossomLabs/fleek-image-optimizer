import pngWasm from "@jsquash/png/codec/squoosh_png_bg.wasm";
import decodePng, { init as decodeInit } from "@jsquash/png/decode";
export async function decodeImage(image: ArrayBuffer): Promise<ImageData> {
  const w = await (pngWasm as unknown as () => Promise<WebAssembly.Module>)();
  await decodeInit(w);
  return await decodePng(image);
}
