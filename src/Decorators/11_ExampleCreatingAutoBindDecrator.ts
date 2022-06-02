export default () => {
  function AutoBind(
    _: any,
    _2: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;
    // in here we update the object descriptor and if you don't what descriptor is search on it
    // so we add a "get()" so we can bind the "this" to the current call object
    // so that means that the "this" will be point to the calling class
    // that means when you add this decrator to a method in a function the "this" will point to the class that have the decrator
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      enumerable: false,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return adjDescriptor;
  }

  class Printer {
    message = "This works";

    @AutoBind
    showMessage(): void {
      console.log(this.message);
    }
  }

  const p = new Printer();

  p.showMessage();

  const button = document.querySelector("button")!;
  button.addEventListener("click", p.showMessage);
}; // file-end
