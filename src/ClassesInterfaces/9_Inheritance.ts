export default () => {
  class Department {
    private employees: string[] = [];

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
  }

  class ITDepartment extends Department {
    admins: string[];

    constructor(id: number, admins: string[]) {
      super(id, "IT");
      this.admins = admins;
    }
  }

  const accounting = new Accounting(1);
  accounting.addEmployee("Test 1");
  accounting.addEmployee("Test 2");
  accounting.printEmployeeInformation();
  accounting.addReport("Report 1");
  accounting.printReports();

  const it = new ITDepartment(2, ["Admin 1", "Admin 2"]);
  console.log(it);
};
