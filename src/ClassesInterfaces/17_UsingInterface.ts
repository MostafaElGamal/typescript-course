export default () => {
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
