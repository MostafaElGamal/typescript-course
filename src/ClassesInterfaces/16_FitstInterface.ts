export default () => {
  // What is interface is the structure of a class or the type of each proprtey that inside of it.
  // You can extends the interface and use it to strcuture an object
  // You we can use it to check the type of and object

  interface Person {
    name: string;
    age: number;

    greet(phrase: string): void;
  }

  let user: Person;

  user = {
    name: "Mustafa",
    age: 27,
    greet(phrase) {
      console.log(`${phrase} ${this.name}`);
    },
  };

  user.greet("Hi there Im ");
};
