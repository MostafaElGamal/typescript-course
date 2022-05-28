export default () => {
  // Generic type are used for speciy a daynamic type that will be used in the instanse of the class
  // in here if you will use a union type it will allows for string and number and boolean to be mixed togther
  // but in the generic type will be only one type in the instanse of the class right here in the example
  class DataStorage<T extends string | number | boolean> {
    private data: Array<T> = [];

    addItem(item: T) {
      this.data.push(item);
    }

    removeItem(item: T) {
      this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
      return [...this.data];
    }
  }

  const textStorage = new DataStorage<string>();
  textStorage.addItem("Mustafa");
  textStorage.addItem("Sayed");
  // textStorage.addItem(1); That will be wrong because the type of the class is string not number
  textStorage.removeItem("Mustafa");
  console.log(textStorage.getItems());

  const numberStorage = new DataStorage<number>();
  numberStorage.addItem(1);
  numberStorage.addItem(2);
  numberStorage.addItem(3);
  console.log(numberStorage.getItems());

  // const objStorage = new DataStorage<object>();
  // const maxObj = { name: "Max" };
  // objStorage.addItem(maxObj);
  // objStorage.addItem({ name: "Manu" });
  // objStorage.removeItem(maxObj);
  // console.log(objStorage.getItems());
}; // file end
