const test = () => {
    class Department {
        constructor(id, name) {
            this.id = id;
            this.name = name;
            this.emplpoyees = [];
        }
        department() {
            console.log(this.id, this.name);
        }
        addEmployee(employe) {
            this.emplpoyees.push(employe);
        }
    }
    class AccountingDepartment extends Department {
        constructor(id, reports = []) {
            super(id, "Accounting");
            this.reports = reports;
        }
        addReport(text) {
            this.reports.push(text);
        }
        printReports() {
            console.log(this.reports, "Reports");
        }
    }
    class ITDepartment extends Department {
        constructor(id, admins = []) {
            super(id, "IT"); // calles the constructor of the parent class.
            this.admins = admins;
        }
    }
    const accounting = new AccountingDepartment(1);
    accounting.department();
    accounting.addEmployee("accounting_employe_1");
    const it = new ITDepartment(2);
    it.addEmployee("it_employee_1");
    console.log(it.emplpoyees);
    console.log(accounting.emplpoyees);
};
export default test;
