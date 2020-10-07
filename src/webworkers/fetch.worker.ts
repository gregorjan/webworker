import { Status } from "../enums";
import { fetchCatList } from "../api/fetchCatList";

type Store = {
  data?: unknown;
};

const store: Store = {};

type Actions = {
  getData: () => void;
};

const actions: Actions = {
  getData: async () => {
    await fetchCatList()
      .then((data) => {
        store.data = data;
      })
      .catch(() => ({
        status: Status.error,
      }));

    self.postMessage({ status: Status.ready, store });
  },
};

const dispatcher = (e: MessageEvent<keyof Actions>) => {
  try {
    actions[e.data]();
  } catch (error) {
    console.error(error);
  }
};

self.addEventListener("message", dispatcher, false);
