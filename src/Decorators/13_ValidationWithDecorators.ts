export default () => {
  interface ValidatorConfig {
    [property: string]: {
      [validateableProp: string]: string[]; // ['required', 'positive']
    };
  }

  const registeredValidators: ValidatorConfig = {};

  // This function is used for register the validation key "req" or "pos"
  function Required(target: any, propName: string) {
    // This is from js the "constructor" for every obje there is a constructor property
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: ["req"],
    };
  }

  function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
      ...registeredValidators[target.constructor.name],
      [propName]: ["pos"],
    };
  }

  // This is the function that implements the validation for each decorator
  function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];

    if (!objValidatorConfig) return true;
    let isValid = true;
    for (const prop in objValidatorConfig) {
      for (const validator of objValidatorConfig[prop]) {
        const objValue = obj[prop];
        switch (validator) {
          case "req":
            isValid = isValid && !!objValue;
            break;
          case "pos":
            isValid = isValid && objValue > 0;
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

  const courseForm = document.querySelector("form")!;
  courseForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleEl = document.getElementById("title") as HTMLInputElement;
    const priceEl = document.getElementById("price") as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);

    console.log(validate(createdCourse), "VALIDATE");
    if (!validate(createdCourse)) {
      alert("Invalid Data");
      return;
    }
    console.log(createdCourse);
  });
}; // File-End
