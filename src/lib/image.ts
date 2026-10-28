// Yüklemeden önce görseli tarayıcıda küçültür: en fazla 1200px genişlik, WebP, hedef ~100 KB altı.
const MAX_WIDTH = 1200;
const TARGET_BYTES = 100 * 1024;

export async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  const scale = Math.min(1, MAX_WIDTH / bitmap.width);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const toBlob = (q: number) => new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", q));

  let quality = 0.85;
  let blob = await toBlob(quality);
  while (blob && blob.size > TARGET_BYTES && quality > 0.45) {
    quality -= 0.1;
    blob = await toBlob(quality);
  }
  if (!blob || blob.type !== "image/webp") throw new Error("Fotoğraf dönüştürülemedi");
  return blob;
}
