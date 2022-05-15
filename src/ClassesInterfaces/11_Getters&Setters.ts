export default () => {
  class Department {
    protected employees: string[] = [];

    constructor(private readonly id: number, public name: string) {}
  }

  class Accounting extends Department {
    private lastReport: string;

    constructor(id: number, public reports: string[] = []) {
      super(id, "Accounting");
      this.lastReport = reports[0];
    }

    get mostRecentReport(): string {
      if (this.lastReport) {
        return this.lastReport;
      }
      throw new Error("No Report Found");
    }

    set mostRecentReport(value: string) {
      if (!value) {
        throw new Error("Please pass in a value");
      }
      this.addReport(value);
    }

    printReports(): void {
      console.log(this.reports);
    }

    addReport(report: string): void {
      this.reports.push(report);
      this.lastReport = report;
    }
  }

  const accounting = new Accounting(1);

  accounting.addReport("Report 1");

  console.log(accounting.mostRecentReport, "Last Report");

  accounting.mostRecentReport = "sadasdasd";

  console.log(accounting.mostRecentReport, "Last Report 2");
};
