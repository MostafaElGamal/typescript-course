export default () => {
  // You can also add decorator to any property you want
  // and will display in the our example here
  function Log(target: any, propertyName: string | Symbol) {
    console.log("Property decorator");
    console.log(target); // this is the "Person" class in our case also
    console.log(propertyName); // this is the "title" in our case
  }
  class Product {
    @Log
    title: string;
    private _price: number;

    constructor(title: string, price: number) {
      this.title = title;
      this._price = price;
    }

    set price(val: number) {
      if (val > 0) {
        this._price = val;
      } else {
        throw new Error("Invalid price - shoud be positive.");
      }
    }

    getPriceWithTax(tax: number) {
      return this._price * (1 + tax);
    }
  }
}; // file-end
