export default () => {
  function Logger(constructor: Function) {
    console.log("Logging");
    console.log(constructor, "constructor");
  }

  // This is a "Decorator" the decorator is simply a function
  // The Decorator is run when your class is defined not when instatiated
  // That means if you didn't create an instace from the class it will also run
  @Logger
  class Persson {
    name = "max";
    constructor() {
      console.log("Creating person object... ");
    }
  }

  //   const per = new Persson();
  //   console.log(per);
}; // file-end
