export default () => {
  // This is the constraints of generaic type
  // so with the "extends" keyword you can constarin the type of and objet just the type but any object in this case

  function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB);
  }

  const mergeObj = merge({ name: "Max" }, { age: 30 });

  console.log(mergeObj);
}; // file end
