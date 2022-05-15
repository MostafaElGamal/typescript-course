export default () => {
  class Department {
    name: string;

    constructor(name: string) {
      this.name = name;
    }

    // "this" keyword is thing that responsable for calling a method.
    // If you add "this" in the paramenter the "this" will be point to the parent class.
    describe(this: Department) {
      console.log("Department: ", this.name);
    }
  }

  const accounting = new Department("Accounting");

  accounting.describe();

  // In this point "this" keyword will point to the object not the parent class.
  const accountingCopy = { name: "Test", describe: accounting.describe };

  accountingCopy.describe();
};
