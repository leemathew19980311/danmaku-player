import { useGlobalState } from "@/components/utils";

const generateFileHash = async (file: File): Promise<string | undefined> => {
  return new Promise((resolve) => {
    const worker = new Worker(new URL("./hashWorker.ts", import.meta.url));
    worker.onmessage = (e) => {
      useGlobalState.setState({ file_hash: e.data });
      resolve(e.data);
    };
    worker.onerror = (e) => {
      useGlobalState.setState({ file_hash: undefined });
      resolve(undefined);
    };
    worker.postMessage({ file });
  });
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
      input.remove();
      resolve(file); // 解析文件
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
