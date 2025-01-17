import resizeWasm from "@jsquash/resize/lib/resize/pkg/squoosh_resize_bg.wasm";
import resizeInit from "@jsquash/resize/lib/resize/pkg/squoosh_resize";
import resize from "@jsquash/resize";

export async function resizeImage(decoded: ImageData, width: number) {
  const aspectRatio = decoded.height / decoded.width;
  await resizeInit(
    await (resizeWasm as unknown as () => Promise<WebAssembly.Module>)(),
  );
  const processed = await resize(decoded, {
    width,
    height: Math.round(width * aspectRatio),
  });
  return processed;
}
