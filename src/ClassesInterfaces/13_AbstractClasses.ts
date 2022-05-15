export default () => {
  // YOU HAVE TO ADD "abstract" KEYWORD IN THE CLASS IF THERE IS ANY METHOD OR PROPRTEY THAT NEEDED TO MAKE THE CHILDREN ADDED IT.
  // "abstract" classes can't be intilaze the class you can only inhert from it so in other word you can't make a new instansr from it.
  abstract class Department {
    protected employees: string[] = [];

    constructor(protected readonly id: number, public name: string) {}

    // The "abstract" forces the childern that inherate form the parent to add this function with ther own implmeteation.
    abstract describe(this: Department): void;
  }

  class Accounting extends Department {
    constructor(id: number, public reports: string[] = []) {
      super(id, "Accounting");
    }

    printReports(): void {
      console.log(this.reports);
    }

    addReport(report: string): void {
      this.reports.push(report);
    }

    describe(): void {
      console.log(`Accounting Department ID: ${this.id}`);
    }
  }

  class ITDepartment extends Department {
    admins: string[];

    constructor(id: number, admins: string[]) {
      super(id, "IT");
      this.admins = admins;
    }

    describe(): void {
      console.log(`IT Department ID: ${this.id}`);
    }
  }

  const accounting = new Accounting(1);
  const it = new ITDepartment(2, []);
  accounting.describe();
  it.describe();

  // Cannot create an instance of an abstract
  // const department = new Department(2, "asdasd");
};
