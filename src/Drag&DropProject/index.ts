import { ProjectInput } from "./components/project-input.js";
import { ProjectList } from "./components/project-list.js";

export default () => {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
};
