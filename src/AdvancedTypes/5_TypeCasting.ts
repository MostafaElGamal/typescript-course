export default () => {
  // This is type casting that mean you specify the type of the object by these syntax.

  const firstUserInputElement = <HTMLInputElement>(
    document.getElementById("user-input")
  );

  const secondUserInputElement = document.getElementById(
    "user-input",
  ) as HTMLInputElement;

  firstUserInputElement.value = "Hi there!";
  secondUserInputElement.value = "Hi there!";
}; // file end
