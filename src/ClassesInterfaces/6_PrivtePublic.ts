export default () => {
  class Department {
    // "private" modifier is make the proprtey or the mehtod only avaliable within the class.
    private employees: string[] = [];
    private name: string;

    constructor(name: string) {
      this.name = name;
    }

    // "this" keyword is thing that responsable for calling a method.
    // If you add "this" in the paramenter the "this" will be point to the parent class.
    describe(this: Department) {
      console.log("Department: ", this.name);
    }

    addEmployee(employe: string) {
      this.employees.push(employe);
    }

    printEmployeeInformation() {
      console.log(this.employees.length);
      console.log(this.employees);
    }
  }

  const accounting = new Department("Accounting");

  accounting.addEmployee("Test 1");
  accounting.addEmployee("Test 2");

  accounting.printEmployeeInformation();
  accounting.describe();
};
