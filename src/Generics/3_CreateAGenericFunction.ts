export default () => {
  // The is Generic type and what is generic type:
  // Is in a case you don't want to specific exactily the type of the object
  // You said to TS there is a any type that will return and with that will merge the 2 types togther
  // In this case will merge the 'name' and the 'age'
  // The "T" & "U" not static type it's dynamic type that set dynamicly when calling the function
  function merge<T, U>(objA: T, objB: U) {
    return Object.assign(objA, objB);
  }

  const mergeObj = merge({ name: "Max" }, { age: 30 });

  // You can add dynamic type by specify the type of the function
  // const mergeObj = merge<string, number>(Max, 30 );

  console.log(mergeObj.age);
}; // file end
