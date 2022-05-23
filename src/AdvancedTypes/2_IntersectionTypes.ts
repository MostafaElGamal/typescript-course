export default () => {
  interface Admin {
    name: string;
    privileges: string[];
  }

  interface Empolyee {
    name: string;
    startDate: Date;
  }

  //   interface ElevatedEmployee extends Empolyee, Admin {}

  type ElevatedEmployee = Admin & Empolyee;

  const e1: ElevatedEmployee = {
    name: "Max",
    privileges: ["create-server"],
    startDate: new Date(),
  };

  type Combinable = string | number;
  type Numeric = number | boolean;

  type Universal = Combinable & Numeric;
}; // file end
