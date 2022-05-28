export default () => {
  // The "keyof" is about to make sure that the key that passing when calling the fucntion
  // will inside the the "T" object
  // Is like validate if there the key is inside of the first parametr object
  function extractAndConvert<T extends object, U extends keyof T>(
    obj: T,
    key: U,
  ) {
    return `Value: ${obj[key]}`;
  }

  console.log(extractAndConvert({ name: "mustafa" }, "name"));
}; // file end
