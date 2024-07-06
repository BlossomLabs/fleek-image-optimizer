
import webpWasm from '@jsquash/webp/codec/enc/webp_enc_simd.wasm'
import avifWasm from '@jsquash/avif/codec/enc/avif_enc.wasm'
import encodeWebp, { init as encodeWebpInit } from '@jsquash/webp/encode'
import encodeAvif,{ init as encodeAvifInit } from '@jsquash/avif/encode'

export async function encodeImage(processed: ImageData, toFormat: 'webp' | 'avif') {
  let encoded
  switch (toFormat) {
    case 'avif':
      await encodeAvifInit(await (avifWasm as any)())
      encoded = await encodeAvif(processed)
      break;
    case 'webp':
      await encodeWebpInit(await (webpWasm as any)())
      encoded = await encodeWebp(processed)
      break;
  }
  return encoded
}