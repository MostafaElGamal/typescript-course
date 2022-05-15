export default () => {
  abstract class Department {
    protected employees: string[] = [];

    constructor(protected readonly id: number, public name: string) {}

    abstract describe(this: Department): void;
  }

  // Singleton pattern is a patterm that make sure that you have 1 instance form a class.
  class Accounting extends Department {
    private static instance: Accounting;

    // If you add private on the constructor that will be private class you can only creat one new object from it that it.
    private constructor(id: number, public reports: string[] = []) {
      super(id, "Accounting");
    }

    static getInstance(id: number, reports: string[]): Accounting {
      if (this.instance) return this.instance;
      this.instance = new Accounting(id, reports);
      return this.instance;
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

  const accounting = Accounting.getInstance(1, []);
  const accounting_2 = Accounting.getInstance(2, []);

  console.log(accounting, "first");
  console.log(accounting_2, "second");
};
