export default () => {
  interface Length {
    length: number;
  }

  function countAndDescribe<T extends Length>(element: T): [T, string] {
    let descText = "Got no value.";
    if (element.length === 1) {
      descText = `Got 1 element`;
    } else if (element.length > 1) {
      descText = `Got ${element.length} elements`;
    }

    return [element, descText];
  }

  console.log(countAndDescribe(["sports", "cooking"]));

  // The perpoise of generic is to make the type dynamic
  // so you can reuse the type multiple times
}; // file end
