export default () => {
  class Department {
    static fiscalYear = 2020;
    protected employees: string[] = [];

    constructor(private readonly id: number, public name: string) {}
    // You can call this method even you didn't intialze the class like "Math" class.
    static createEmployee(name: string) {
      return { name: name };
    }
  }

  const employe_1 = Department.createEmployee("Mustafa");
  console.log(employe_1);
  console.log(Department.fiscalYear);
};
