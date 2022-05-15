export default () => {
  class Department {
    // "protected" keyword allow the value to be accessable in the children classes
    // but not accessable outside the class that mean you can't update it out side the parent class or the childern class.
    protected employees: string[] = [];

    constructor(private readonly id: number, public name: string) {}

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

  class Accounting extends Department {
    constructor(id: number, public reports: string[] = []) {
      super(id, "Accounting");
    }

    printReports() {
      console.log(this.reports);
    }

    addReport(report: string) {
      this.reports.push(report);
    }

    // now you can over write the main  method that from the parent class.
    addEmployee(employe: string): void {
      if (employe == "Test 3") {
        return;
      }
      this.employees.push(employe);
    }
  }

  const accounting = new Accounting(1);

  accounting.addReport("Report 1");
  accounting.printReports();

  accounting.addEmployee("Test 1");
  accounting.addEmployee("Test 2");
  accounting.addEmployee("Test 3");

  accounting.printEmployeeInformation();
};
