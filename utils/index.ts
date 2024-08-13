import { createHash } from "crypto"; // 导入 crypto 库

const generateFileHash = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const hash = createHash("sha256");
  hash.update(new Uint8Array(arrayBuffer));
  return hash.digest("hex");
};

function generateFingerprint() {
  const fingerprint = {
    userAgent: navigator.userAgent,
    language: navigator.language,
    screenResolution: `${screen.width}x${screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    plugins: Array.from(navigator.plugins).map((plugin) => plugin.name),
    canvas: getCanvasFingerprint(),
  };
  return fingerprint;
}

function getCanvasFingerprint() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.textBaseline = "top";
  ctx.font = "14px Arial";
  ctx.fillText("Fingerprint", 2, 2);
  return canvas.toDataURL();
}

function getFileFromLocal(): Promise<File | undefined> {
  // 明确返回类型
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "video/*";

  return new Promise<File | undefined>((resolve) => {
    // 使用 Promise
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      resolve(file); // 解析文件
    };
    input.click();
  });
}

export { generateFileHash, generateFingerprint, getFileFromLocal };
