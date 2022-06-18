namespace App {
  export interface Validateable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  export function validate(validateableInput: Validateable): boolean {
    let isValid = true;
    const value = validateableInput.value;
    if (validateableInput.required) {
      isValid = isValid && value.toString().trim().length !== 0;
    }

    if (validateableInput.minLength != null && typeof value == "string") {
      isValid = isValid && value.length >= validateableInput.minLength;
    }

    if (validateableInput.maxLength != null && typeof value == "string") {
      isValid = isValid && value.length <= validateableInput.maxLength;
    }

    if (validateableInput.min != null && typeof value == "number") {
      isValid = isValid && value >= validateableInput.min;
    }

    if (validateableInput.max != null && typeof value == "number") {
      isValid = isValid && value <= validateableInput.max;
    }

    return isValid;
  }
}
