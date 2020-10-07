type Store = {
  data?: any;
};

let store: Store = {};

const data = (async () => {
  return await fetch("https://api.thecatapi.com/v1/images/search")
    .then((response) => response.json())
    .catch((e) => {
      throw new Error(e);
    });
})();

self.addEventListener(
  "message",
  (e) => {
    if (e.data === "getData") {
      if (store.data) {
        self.postMessage(store.data);
      } else {
        data.then((data) => {
          self.postMessage(data);
          store = { ...store, data };
        });
      }
    }
  },
  false
);
