import React from "react";
import { useWebWorker } from "./useWebWorker";

export const App = () => {
  const data = useWebWorker();
  console.log(data);

  return <div>{JSON.stringify(data)}</div>;
};
