export default () => {
  interface ValidateConfig {
    [property: string]: {
      [validatableProps: string]: string[]; // ['required', 'positive]
    };
  }

  const registeredValidators: ValidateConfig = {};

  function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: ["required"],
    };
  }

  function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: ["positive"],
    };
  }

  function validate(obj: any): boolean {
    const objValidatorConfig = registeredValidators[obj.constructor.name]; // This is in the prototype in the object

    if (!objValidatorConfig) {
      return true;
    }
    let isValid = true;

    for (const prop in objValidatorConfig) {
      const objValue = objValidatorConfig[prop];
      for (const validator of objValue) {
        switch (validator) {
          case "requird":
            isValid = isValid && !!obj[prop];
            break;
          case "positive":
            isValid = isValid && obj[prop] > 0;
            break;
        }
      }
    }
    return isValid;
  }

  class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
      this.title = t;
      this.price = p;
    }
  }
  console.log("registeredValidators", registeredValidators);
  const courseForm = document.querySelector("form")!;
  courseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleEl = <HTMLInputElement>document.getElementById("title");
    const priceEl = <HTMLInputElement>document.getElementById("price");

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
      alert("Invalid input please try again");
      return;
    }
    console.log(createdCourse);
  });
}; // file-end
