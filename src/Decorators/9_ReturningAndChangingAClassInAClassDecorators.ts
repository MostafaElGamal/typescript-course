export default () => {
  function WithTemplate(template: string, hookId: string) {
    console.log("TEMPLATE FACTORY");
    // "new()"  called here "constructor signature"
    return function <T extends { new (...args: any[]): { name: string } }>( // "new()" Describes a constructor siganture in ts that means it describes the shape of the constructor
      originalConstructor: T,
    ) {
      // This class will run after creating instace of the class
      // and here we did take the old class and add more functiolanty to it
      // This is will help you to add more functiolantly to the class that you want to do just
      // by create decorators
      return class extends originalConstructor {
        constructor(...args: any[]) {
          super();
          console.log("Rendering Template");
          const hookEl = document.getElementById(hookId);
          if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector("h1")!.textContent = this.name; // This called "!" non-null assertion operator
          }
        }
      };
    };
  }

  @WithTemplate("<h1>My Person Object</h1>", "app")
  class Person {
    name: string = "max";
    constructor() {
      console.log("Creating person object... ");
    }
  }

  // const per = new Person();
  // console.log(per);
}; // file-end
