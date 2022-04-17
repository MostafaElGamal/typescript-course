export default () => {
  class Department {
    // what "protected" do is to make the proptry acceasble to inside any class that extends the parent class.
    // That means you can't access it publicy like this  "department.employees"
    protected emplpoyees: string[] = [];

    constructor(private id: string | number, public name: string) {}

    department(): void {
      console.log(this.id, this.name);
    }

    addEmployee(employe: string): void {
      this.emplpoyees.push(employe);
    }

    printEmployees(): void {
      console.log(this.emplpoyees, "emplpoyees");
    }
  }

  class AccountingDepartment extends Department {
    constructor(id: string | number, private reports: string[] = []) {
      super(id, "Accounting");
    }

    addEmployee(name: string): void {
      if (name == "max") {
        // Do nothing
      } else {
        this.emplpoyees.push(name);
      }
    }

    addReport(text: string): void {
      this.reports.push(text);
    }

    printReports(): void {
      console.log(this.reports, "Reports");
    }
  }

  class ITDepartment extends Department {
    // When you inherate a class the constructor of the parent class will be in the child class and all the methods and propties.
    private admins: string[];

    constructor(id: string | number, admins: string[] = []) {
      super(id, "IT"); // calles the constructor of the parent class.
      this.admins = admins;
    }

    printAdmins(): void {
      console.log(this.admins, "admins");
    }
  }

  const accounting = new AccountingDepartment(1);

  accounting.department();
  accounting.addEmployee("accounting_employe_1");
  accounting.addEmployee("max");

  accounting.printEmployees();
  const it = new ITDepartment(2);
  it.addEmployee("it_employee_1");
  it.printEmployees();
};
