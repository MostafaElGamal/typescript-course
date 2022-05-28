export default () => {
  // The Generic type is a type that connected to other type that required parameters
  // Like "Array" type
  const names: Array<string> = [];
  //   names[0].split(" ");

  const promise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("This is Done");
    }, 2000);
  });

  async function callPromise(): Promise<void> {
    const data = await promise;
    console.log(data.split(" "));
  }

  callPromise();
}; // file end
