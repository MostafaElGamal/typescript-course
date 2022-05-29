export default () => {
  function Logger(logString: string) {
    console.log("Logger");
    return function (constructor: Function) {
      console.log(logString);
    };
  }

  function WithTemplate(template: string, hookId: string) {
    console.log("WithTemplate");
    return function (constructor: any) {
      console.log("Rendering Template");
      const p = new constructor();
      const hookEl = document.getElementById(hookId);
      if (hookEl) {
        hookEl.innerHTML = template;
        hookEl.querySelector("h1")!.textContent = p.name; // This called "!" non-null assertion operator
      }
    };
  }

  // The Decorator run bottom to top this only for the return function
  // but if I made console log in the decorator dircatry will run from top to bottom
  @Logger("Person Log")
  @WithTemplate("<h1>My Person Object</h1>", "app")
  class Persson {
    name = "max";
    constructor() {
      console.log("Creating person object... ");
    }
  }

  const per = new Persson();
  console.log(per);
}; // file-end
