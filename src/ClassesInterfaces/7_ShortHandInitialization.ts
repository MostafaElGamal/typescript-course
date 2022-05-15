export default () => {
  class Department {
    // private id: string;
    // private name: string;
    private employees: string[] = [];

    constructor(public name: string, private id: string | number) {}

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
