// import * as ClassesInterfaces from "./ClassesInterfaces/index.js";
// import * as ClassesInterfaces from "./AdvancedTypes/index.js";
// import * as ClassesInterfaces from "./Generics/index.js";
import * as ClassesInterfaces from "./Decorators/index.js";

const classesInterfacesObject = ClassesInterfaces as {
  [key: string]: Function;
};

for (const objectKey in classesInterfacesObject) {
  classesInterfacesObject[objectKey]();
}
