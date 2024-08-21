export interface DanmakuItem {
  id: number;
  file_hash: string;
  content: string;
  offset_time: number;
  file_matadata: { [key: string]: any };
}
