import * as ClassesInterfaces from "./ClassesInterfaces/index.js";

const classesInterfacesObject = ClassesInterfaces as {
  [key: string]: Function;
};

for (const objectKey in classesInterfacesObject) {
  classesInterfacesObject[objectKey]();
}
