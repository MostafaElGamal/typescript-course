export default () => {
  const userInput = "";

  // This is Nulilish Coalescing this check if it's not "Null" or 'Undefined' only if not neither of these 2 will display the default
  const storedData = userInput ?? "DEFAULT"; // Null || undefaind will display "DEFAULT"

  console.log(storedData);
}; // file end
