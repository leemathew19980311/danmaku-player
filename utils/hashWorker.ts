import { createHash } from "crypto"; // 导入 crypto 库
self.onmessage = async function (e) {
  const { file } = e.data;
  const chunkSize = 1024 * 1024 * 20; // 2MB per chunk
  const hash = createHash("sha256");
  const fileReader = new FileReader();

  let offset = 0;

  function readNextChunk() {
    const slice = file.slice(offset, offset + chunkSize);
    fileReader.readAsArrayBuffer(slice);
  }

  fileReader.onload = function (event) {
    const arrayBuffer = event.target?.result as ArrayBuffer;
    hash.update(new Uint8Array(arrayBuffer));
    offset += chunkSize;

    // 打印进度
    const progress = Math.min((offset / file.size) * 100, 100);
    console.log(`进度: ${progress.toFixed(2)}%`);

    if (offset < file.size) {
      readNextChunk();
    } else {
      self.postMessage(hash.digest("hex"));
      self.close();
    }
  };

  readNextChunk();
};
