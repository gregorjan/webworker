import Worker from "worker-loader!./worker.ts";
import { wrap } from "comlink";
import { proxy } from "comlink";

const remoteStoreWrapper = async (remoteStore: any) => {
  const subscribers = new Set();

  let latestState = await remoteStore.getState();
  remoteStore.subscribe(
    proxy(async () => {
      latestState = await remoteStore.getState();
      subscribers.forEach((f) => f());
    })
  );
  return {
    dispatch: (action: any) => remoteStore.dispatch(action),
    getState: () => latestState,
    subscribe(listener: any) {
      subscribers.add(listener);
      return () => subscribers.delete(listener);
    },
  };
};

let store: any = null;

const run = async () => {
  const remoteStore = wrap(new Worker());
  store = await remoteStoreWrapper(remoteStore);
  console.log("asdf");
};

export const useWebWorker = () => {
  run();
  return store;
};
