import pngWasm from '@jsquash/png/codec/squoosh_png_bg.wasm'
import decodePng, { init as decodeInit } from '@jsquash/png/decode'
export async function decodeImage(image: ArrayBuffer): Promise<ImageData> {
    let decoded;
    await decodeInit(await (pngWasm as any)())
    decoded = await decodePng(image);
    return decoded;
}
