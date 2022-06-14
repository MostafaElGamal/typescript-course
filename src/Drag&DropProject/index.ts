export default () => {
  // Project State Mangement
  class ProjectState {
    private listeners: any[] = [];
    private projects: any[] = [];
    private static instance: ProjectState;

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }

    addListener(listenerFn: Function) {
      this.listeners.push(listenerFn);
    }

    addProject(title: string, description: string, numOfPeople: number) {
      const newProject = {
        id: Math.random().toString(),
        title,
        description,
        people: numOfPeople,
      };
      this.projects.push(newProject);

      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }

  const projectState = ProjectState.getInstance();

  // Validation
  interface Validateable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }

  function validate(validateableInput: Validateable): boolean {
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

  // Decorators
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

  // Main Functionalty
  class ProjectList {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    element: HTMLElement;
    assignedProjects: any[];

    constructor(private type: "active" | "finished") {
      this.templateElement = <HTMLTemplateElement>(
        document.getElementById("project-list")!
      );
      this.hostElement = <HTMLDivElement>document.getElementById("app")!;
      const importedNode = document.importNode(
        this.templateElement.content,
        true,
      );
      this.element = <HTMLElement>importedNode.firstElementChild;
      this.assignedProjects = [];

      this.element.id = `${this.type}-projects`;

      projectState.addListener((projects: any[]) => {
        this.assignedProjects = projects;
        this.renderProjects();
      });

      this.attach();
      this.renderContent();
    }

    private renderProjects(): void {
      const listEl = <HTMLUListElement>(
        document.getElementById(`${this.type}-projects-list`)!
      );

      for (const prjItem of this.assignedProjects) {
        const listItem = document.createElement("li");
        listItem.textContent = prjItem.title;
        listEl?.appendChild(listItem);
      }
    }

    private renderContent(): void {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector("ul")!.id = listId;
      this.element.querySelector(
        "h2",
      )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
    }

    private attach(): void {
      this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
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

      const tilteValidatable: Validateable = {
        value: enteredTitle,
        required: true,
      };
      const descriptionValidatable: Validateable = {
        value: enteredDescription,
        required: true,
        minLength: 10,
      };
      const peopleValidatable: Validateable = {
        value: +enteredPeople,
        required: true,
        min: 1,
        max: 10,
      };

      if (
        validate(tilteValidatable) &&
        validate(descriptionValidatable) &&
        validate(peopleValidatable)
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
        projectState.addProject(title.toString(), desc.toString(), +people);
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
  const activePrjList = new ProjectList("active");
  const finishedPrjList = new ProjectList("finished");
};
