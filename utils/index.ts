import { createHash, hash } from "crypto"; // 导入 crypto 库

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
      //   if (file) {
      //     interface RecentFile {
      //       name: string;
      //       path: string;
      //       hash: string;
      //       timestamp: number;
      //     }
      //     const recentFile: RecentFile[] =
      //       getStorageFromLocal("recentFile") || [];
      //     const hash = await generateFileHash(file);
      //     const recentFileHash = recentFile.find((item) => item.hash === hash);
      //     if (recentFileHash) {
      //       recentFileHash.timestamp = Date.now();
      //     } else {
      //       recentFile.push({
      //         name: file.name,
      //         path: (event.target as HTMLInputElement).value,
      //         hash,
      //         timestamp: Date.now(),
      //       });
      //     }
      //     setStorageToLocal("recentFile", recentFile);
      //   }
      input.remove();
    };
    input.click();
  });
}

function getStorageFromLocal(key: string) {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return undefined;
}

function setStorageToLocal(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

function requestFullscreen(elem: any) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.msRequestFullscreen) {
    elem.msRequestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else {
    console.error("requestFullScreen is not exist in target");
  }
}

function exitFullscreen(): void {
  const _document: any = document;
  if (_document.exitFullscreen) {
    _document.exitFullscreen();
  } else if (_document.msExitFullscreen) {
    _document.msExitFullscreen();
  } else if (_document.mozCancelFullScreen) {
    _document.mozCancelFullScreen();
  } else if (_document.oRequestFullscreen) {
    _document.oCancelFullScreen();
  } else if (_document.webkitExitFullscreen) {
    _document.webkitExitFullscreen();
  }
}

export {
  generateFileHash,
  generateFingerprint,
  getFileFromLocal,
  getStorageFromLocal,
  setStorageToLocal,
  requestFullscreen,
  exitFullscreen,
};
