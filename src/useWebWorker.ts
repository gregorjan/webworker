import WebpackWorker from "./webworkers/fetch.worker.ts";
import React from "react";

type Data = {
  data: unknown;
};

const worker = new WebpackWorker();

export const useWebWorker = () => {
  const [data, setData] = React.useState<Data | null>(null);
  const parseData = ({ data }: MessageEvent<Data>) => setData(data);

  React.useEffect(() => {
    worker.onmessage = parseData;
    worker.postMessage("getData");
  }, []);

  return data;
};
