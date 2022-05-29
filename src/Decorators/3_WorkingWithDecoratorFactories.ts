export default () => {
  // Decorator Factories is about makeing the decorator more dynamic and custimaziable
  // in that case we need to send a string to the decorator so it will be more custom
  // in zid case it's handles the errores so we can custimize a the decorator to recive a function
  function Logger(logString: string) {
    // This is called decorator factory it means you reurn a function that can accepts params
    return function (constructor: Function) {
      console.log(logString);
      console.log(constructor, "constructor");
    };
  }

  @Logger("Logging-Person")
  class Persson {
    name = "max";
    constructor() {
      console.log("Creating person object... ");
    }
  }

  const per = new Persson();
  console.log(per);
}; // file-end
