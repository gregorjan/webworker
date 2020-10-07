import React from "react";
import { useWebWorker } from "./useWebWorker";

export const App = () => {
  const { store, getData } = useWebWorker();
  return (
    <div>
      <button onClick={() => getData()}>get data</button>
      {JSON.stringify(store)}
    </div>
  );
};
