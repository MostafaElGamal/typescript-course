export default () => {
  // Drag & Drop Interfaces
  interface Dragable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
  }
  interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
  }

  // Enums
  enum ProjectStatus {
    Active,
    Finished,
  }
  class Project {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: ProjectStatus,
    ) {}
  }

  // Project State Mangement

  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number): void {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numOfPeople,
        ProjectStatus.Active,
      );

      this.projects.push(newProject);
      this.updateLinsteners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus): void {
      const project = this.projects.find((prj) => prj.id === projectId);
      if (project && project.status !== newStatus) {
        project.status = newStatus;
        this.updateLinsteners();
      }
    }

    private updateLinsteners(): void {
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
  abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
      templateId: string,
      hostElementId: string,
      insertAtStart: boolean,
      newElementId?: string,
    ) {
      this.templateElement = <HTMLTemplateElement>(
        document.getElementById(templateId)!
      );
      this.hostElement = <T>document.getElementById(hostElementId)!;

      const importedNode = document.importNode(
        this.templateElement.content,
        true,
      );
      this.element = <U>importedNode.firstElementChild;

      if (newElementId) this.element.id = newElementId;

      this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean): void {
      this.hostElement.insertAdjacentElement(
        insertAtStart ? "afterbegin" : "beforeend",
        this.element,
      );
    }

    abstract configure(): void;
    abstract renderContent(): void;
  }

  class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Dragable
  {
    private project: Project;

    get persons(): string {
      const people = this.project.people;
      if (people === 1) {
        return "1 Person";
      } else {
        return `${people} Persons`;
      }
    }

    constructor(hostId: string, project: Project) {
      super("single-project", hostId, false, project.id);
      this.project = project;
      this.configure();
      this.renderContent();
    }

    configure(): void {
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }

    renderContent(): void {
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector(
        "h3",
      )!.textContent = `${this.persons} Assigned`;
      this.element.querySelector("p")!.textContent = this.project.description;
    }

    @AutoBind
    dragStartHandler(event: DragEvent): void {
      event.dataTransfer!.setData("text/plain", this.project.id);
      event.dataTransfer!.effectAllowed = "move";
    }

    dragEndHandler(_: DragEvent): void {
      console.log("Drag End");
    }
  }

  class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    assignedProjects: Project[];

    constructor(private type: "active" | "finished") {
      super("project-list", "app", false, `${type}-projects`);

      this.assignedProjects = [];

      this.configure();
      this.renderContent();
    }

    configure(): void {
      this.element.addEventListener("drag", this.dropHandler);
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);

      projectState.addListener((projects: Project[]) => {
        const relevantProjects = projects.filter((prj) => {
          if (this.type == "active") {
            return prj.status == ProjectStatus.Active;
          } else {
            return prj.status == ProjectStatus.Finished;
          }
        });
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });
    }

    renderContent(): void {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector("ul")!.id = listId;
      this.element.querySelector(
        "h2",
      )!.textContent = `${this.type.toUpperCase()} PROJECTS`;
    }

    @AutoBind
    dropHandler(event: DragEvent): void {
      const prjId = event.dataTransfer?.getData("text/plain") || "";
      projectState.moveProject(
        prjId,
        this.type == "active" ? ProjectStatus.Active : ProjectStatus.Finished,
      );
    }

    @AutoBind
    dragOverHandler(event: DragEvent): void {
      console.log(event.dataTransfer?.types);
      if (event.dataTransfer && event.dataTransfer.types[0] == "text/plain") {
        event.preventDefault();
        const listEl = this.element.querySelector("ul")!;
        listEl.classList.add("droppable");
      }
    }

    @AutoBind
    dragLeaveHandler(_: DragEvent): void {
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.remove("droppable");
    }

    private renderProjects(): void {
      const listEl = <HTMLUListElement>(
        document.getElementById(`${this.type}-projects-list`)!
      );
      listEl.innerHTML = "";
      for (const prjItem of this.assignedProjects) {
        new ProjectItem(this.element.querySelector("ul")!.id, prjItem);
      }
    }
  }

  class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");

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
    }

    configure(): void {
      this.element.addEventListener("submit", this.submitHandler);
    }

    renderContent(): void {}

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
        !validate(tilteValidatable) &&
        !validate(descriptionValidatable) &&
        !validate(peopleValidatable)
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
  }

  const prjInput = new ProjectInput();
  const activePrjList = new ProjectList("active");
  const finishedPrjList = new ProjectList("finished");
};
