import { getFileFromLocal } from "@/utils";
import { useGlobalState } from "./utils";
import { Button } from "@nextui-org/react";
import ReplayIcon from "@mui/icons-material/Replay";
import { get, post } from "./axiosInstance";
const SelectFile: React.FC = () => {
  const { setFile, file } = useGlobalState();

  const openFinder = () => {
    getFileFromLocal().then((file) => {
      setFile(file);
    });
  };
  const test = () => {
    console.log("test");
    post("/api/addDanmaku", {
      file_hash: "123",
      content: "hello world",
      offset_time: 1000,
      file_metadata: { filename: "test.mp4" },
    }).then((res) => {
      console.log(res);
    });
  };

  const test2 = () => {
    get("/api/getDanmakuList?fileHash=123").then((res) => {
      console.log("1111", res);
    });
  };

  return (
    <>
      {!file && (
        <div className="flex flex-col gap-2 flex-1 p-20">
          <Button
            className="justify-start bg-transparent hover:bg-slate-300"
            onClick={openFinder}
          >
            打开...
          </Button>
          <Button className="justify-start bg-transparent hover:bg-slate-300">
            打开URL...
          </Button>
          <br />
          <Button className="justify-start bg-transparent hover:bg-slate-300">
            <ReplayIcon fontSize="small" />
            继续播放xxx
          </Button>
        </div>
      )}
    </>
  );
};

export default SelectFile;
