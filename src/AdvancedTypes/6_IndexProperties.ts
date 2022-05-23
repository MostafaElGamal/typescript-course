export default () => {
  // This is index properties in that case you can use any object key because this tell typescript I don't know the number
  // proptes that I use and also there names

  interface ErrorContainer {
    [key: string]: string;
  }

  const errorBag: ErrorContainer = {
    email: "Not a valid email!",
  };
}; // file end
