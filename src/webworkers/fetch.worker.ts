import { Status } from "../enums";

type Store = {
  data?: unknown;
};

const store: Store = {};

const data = () =>
  fetch("https://api.thecatapi.com/v1/images/search?limit=5&page=10&order=Desc")
    .then((response) => response.json())
    .catch((e) => {
      throw new Error(e);
    });

type Actions = {
  getData: () => void;
};

const actions: Actions = {
  getData: async () => {
    data()
      .then((data) => {
        store.data = data;
        self.postMessage({ status: Status.ready, store: store });
      })
      .catch(() => ({
        status: Status.error,
      }));
    if (store.data) {
      self.postMessage({ status: Status.ready, store: store });
    }
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
