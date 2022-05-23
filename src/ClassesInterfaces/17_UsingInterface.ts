export default () => {
  interface Greetable {
    // You can add "readonly" proptery only.
    readonly name: string;
    greet(phrase: string): void;
  }

  class Person implements Greetable {
    constructor(public name: string) {}
    greet(phrase: string): void {}
  }

  let user: Greetable;

  user = {
    name: "Mustafa",
    greet(phrase) {
      console.log(`${phrase} ${this.name}`);
    },
  };

  user.greet("Hi there Im ");
};
