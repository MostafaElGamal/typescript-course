export default () => {
  class Department {
    // private readonly id: string;
    // private name: string;
    private employees: string[] = [];

    // "readonly" will prevent to update the variable.
    constructor(public name: string, private readonly id: string | number) {}

    describe(this: Department) {
      console.log(`Department: ${this.name} |  Id: ${this.id}`);
    }

    addEmployee(employe: string) {
      this.employees.push(employe);
    }

    printEmployeeInformation() {
      console.log(this.employees.length);
      console.log(this.employees);
    }
  }

  const accounting = new Department("Accounting", 1);

  accounting.addEmployee("Test 1");
  accounting.addEmployee("Test 2");

  accounting.printEmployeeInformation();
  accounting.describe();
};
