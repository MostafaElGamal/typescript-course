export default () => {
  // Discriminated unions is a pattern that add "type" prorptey so you can check if the object is that what you want or not
  interface Bird {
    type: "bird";
    flyingSpeed: number;
  }

  interface Horse {
    type: "horse";
    runningSpeed: number;
  }

  type Animal = Bird | Horse;

  function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
      case "bird":
        speed = animal.flyingSpeed;
        break;
      case "horse":
        speed = animal.runningSpeed;
        break;
    }

    console.log(`Moving with speed ${speed}`);
  }

  moveAnimal({ type: "bird", flyingSpeed: 10 });
}; // file end
