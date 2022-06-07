export default () => {
  function AutoBind(
    _: any,
    _2: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const orignalValue = descriptor.value;
    const objDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        return orignalValue.bind(this);
      },
    };
    return objDescriptor;
  }

  class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      this.templateElement = document.getElementById(
        "project-input",
      )! as HTMLTemplateElement;
      this.hostElement = <HTMLDivElement>document.getElementById("app")!;
      const importedNode = document.importNode(
        this.templateElement.content,
        true,
      );
      this.element = importedNode.firstElementChild as HTMLFormElement;
      this.element.id = "user-input";

      this.titleInputElement = <HTMLInputElement>(
        this.element.querySelector("#title")
      );
      this.descriptionInputElement = <HTMLInputElement>(
        this.element.querySelector("#description")
      );
      this.peopleInputElement = <HTMLInputElement>(
        this.element.querySelector("#people")
      );

      this.configure();
      this.attach();
    }

    private gatherUserInput(): (string | number)[] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;
      if (
        enteredTitle.trim().length === 0 ||
        enteredDescription.trim().length === 0 ||
        enteredPeople.trim().length === 0
      ) {
        alert("Invalid input, Please Try again!");
        return;
      } else {
        return [enteredTitle, enteredDescription, +enteredPeople];
      }
    }

    private clearInputs() {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.peopleInputElement.value = "";
    }

    @AutoBind
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        this.clearInputs();
      }
    }

    private configure(): void {
      this.element.addEventListener("submit", this.submitHandler);
    }

    private attach(): void {
      this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
  }

  const prjInput = new ProjectInput();
};
