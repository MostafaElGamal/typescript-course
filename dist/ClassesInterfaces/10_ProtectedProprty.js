export default () => {
    class Department {
        constructor(id, name) {
            this.id = id;
            this.name = name;
            // what "protected" do is to make the proptry acceasble to inside any class that extends the parent class.
            // That means you can't access it publicy like this  "department.employees"
            this.emplpoyees = [];
        }
        department() {
            console.log(this.id, this.name);
        }
        addEmployee(employe) {
            this.emplpoyees.push(employe);
        }
        printEmployees() {
            console.log(this.emplpoyees, "emplpoyees");
        }
    }
    class AccountingDepartment extends Department {
        constructor(id, reports = []) {
            super(id, "Accounting");
            this.reports = reports;
        }
        addEmployee(name) {
            if (name == "max") {
                // Do nothing
            }
            else {
                this.emplpoyees.push(name);
            }
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
        printAdmins() {
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
