export default () => {
  type Admin = {
    name: string;
    privileges: string[];
  };

  type Empolyee = {
    name: string;
    startDate: Date;
  };

  type ElevatedEmployee = Admin & Empolyee;

  const e1: ElevatedEmployee = {
    name: "Max",
    privileges: ["create-server"],
    startDate: new Date(),
  };

  type Combinable = string | number;

  // This is type guard
  function add(a: Combinable, b: Combinable) {
    if (typeof a == "string" || typeof b == "string") {
      return a.toString() + blur.toString();
    }
    return a + b;
  }

  type UnknownEmployee = Empolyee | Admin;

  function printEmployeeInformation(emp: UnknownEmployee) {
    // This is a differnt type of type guard
    // In here you can check if there is proprtey exists in object
    if ("privileges" in emp) {
      console.log(`Privileges: ` + emp.privileges);
    }
    if ("startDate" in emp) {
      console.log("Start Date: " + emp.startDate);
    }
  }

  //   printEmployeeInformation(e1);
  printEmployeeInformation({ name: "Emp", startDate: new Date() });

  class Car {
    drive() {
      console.log("Driving...");
    }
  }

  class Truck {
    drive() {
      console.log("Driving a Truck...");
    }

    loadCargo(amount: number) {
      console.log("Loading cargo...." + amount);
    }
  }

  type Vehicle = Car | Truck;

  const v1 = new Car();
  const v2 = new Truck();

  function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    // This is check "prototype" property of a constructor appears anywhere in the "prototype" chain of an object.
    if (vehicle instanceof Truck) vehicle?.loadCargo(1000);
  }

  useVehicle(v1);
  useVehicle(v2);
}; // file end
