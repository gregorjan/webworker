declare module "*.worker.ts" {
  class FetchWorker extends Worker {
    constructor();
  }

  export default FetchWorker;
}
