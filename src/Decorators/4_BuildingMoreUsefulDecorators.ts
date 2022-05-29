export default () => {
  // This is what he called "Meta Programming"
  function WithTemplate(template: string, hookId: string) {
    return function (constructor: any) {
      const p = new constructor();
      const hookEl = document.getElementById(hookId);
      if (hookEl) {
        hookEl.innerHTML = template;
        hookEl.querySelector("h1")!.textContent = p.name; // This called "!" non-null assertion operator
      }
    };
  }

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
