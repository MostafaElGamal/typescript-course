export default () => {
  function Log(target: any, propertyName: string | Symbol) {
    console.log("Property decorator");
    console.log("target", target);
    console.log("propertyName", propertyName);
    console.log("----------------------------------------------");
  }

  // "PropertyDescriptor" they are an info of the object and it's property
  // it's amazing you can hide an property from an object by just using "enumerable" this value is a boolean that responsable for hide and show the proptertes
  // so you can hide and set and show properties by using the "descriptor"
  //check this video for more info => https://www.youtube.com/watch?v=LD1tQEWsjz4
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

    // This is "Accessor decorator" "it can return a value"
    @Log2
    set price(val: number) {
      if (val > 0) {
        this._price = val;
      } else {
        throw new Error("Invalid price - shoud be positive.");
      }
    }

    // This is "Method decorator" "it can return a value"
    @Log3
    getPriceWithTax(@Log4 tax: number) {
      // This is "Parameter Decorator"
      return this._price * (1 + tax);
    }
  }
}; // file-end
