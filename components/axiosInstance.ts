import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://danmaku-player.vercel.app",
  timeout: 10000,
});

const get = (url: string, params?: any) => instance.get(url, { params });

const post = (url: string, data?: any) => instance.post(url, data);

export { get, post };
