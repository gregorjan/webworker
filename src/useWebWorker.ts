import React from "react";
import { Status } from "./enums";
import FetchWorker from "./webworkers/fetch.worker.ts";

type Data = { status: string; store: { data: unknown[] } };
const worker = new FetchWorker();

const getData = () => worker.postMessage("getData");

export const useWebWorker = () => {
  const [{ status, store }, setData] = React.useState<Data>({
    status: Status.loading,
    store: {
      data: [],
    },
  });
  const parseData = ({ data }: MessageEvent<Data>) => setData(data);

  React.useEffect(() => {
    worker.onmessage = parseData;
    getData();
  }, []);

  return { status, store, getData };
};
