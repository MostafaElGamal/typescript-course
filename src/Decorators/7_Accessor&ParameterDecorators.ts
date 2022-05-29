export default () => {
  function Log(target: any, propertyName: string | Symbol) {
    console.log("Property decorator");
    console.log("target", target);
    console.log("propertyName", propertyName);
    console.log("----------------------------------------------");
  }

  function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log("Accessor decorator");
    console.log("target", target);
    console.log("name", name);
    console.log("descriptor", descriptor);
    console.log("----------------------------------------------");
  }

  function Log3(
    target: any,
    name: string | symbol,
    descriptor: PropertyDescriptor,
  ) {
    console.log("Method decorator");
    console.log("target", target);
    console.log("name", name);
    console.log("descriptor", descriptor);
    console.log("----------------------------------------------");
  }

  function Log4(target: any, name: string | symbol, position: number) {
    console.log("Parameter decorator");
    console.log("target", target);
    console.log("name", name);
    console.log("position", position);
  }

  class Product {
    // This is "propery decorator"
    @Log
    title: string;
    private _price: number;

    constructor(title: string, price: number) {
      this.title = title;
      this._price = price;
    }

    // This is "Accessor decorator"
    @Log2
    set price(val: number) {
      if (val > 0) {
        this._price = val;
      } else {
        throw new Error("Invalid price - shoud be positive.");
      }
    }

    // This is "Method decorator"
    @Log3
    getPriceWithTax(@Log4 tax: number) {
      // This is "Parameter Decorator"
      return this._price * (1 + tax);
    }
  }
}; // file-end
