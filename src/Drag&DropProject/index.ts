import { ProjectInput } from "./components/project-input";
import { ProjectList } from "./components/project-list";

export default () => {
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
};
