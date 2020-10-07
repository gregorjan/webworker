declare module "*.worker.ts" {
  //declare var self: Worker;
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}
