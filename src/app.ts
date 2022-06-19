// import * as ClassesInterfaces from "./ClassesInterfaces/index";
// import * as ClassesInterfaces from "./AdvancedTypes/index";
// import * as ClassesInterfaces from "./Generics/index";
// import * as ClassesInterfaces from "./Decorators/index";
// import * as ClassesInterfaces from "./Drag&DropProject/index";
import * as ClassesInterfaces from "./3rdPartyLibraries/index";

const classesInterfacesObject = ClassesInterfaces as {
  [key: string]: Function;
};

for (const objectKey in classesInterfacesObject) {
  classesInterfacesObject[objectKey]();
}
