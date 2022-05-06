import * as ClassesInterfaces from "./ClassesInterfaces/index.js";
const classesInterfacesObject = ClassesInterfaces;
for (const objectKey in classesInterfacesObject) {
    classesInterfacesObject[objectKey]();
}
