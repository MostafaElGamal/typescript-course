export default () => {
  interface AddFn {
    (a: number, b: number): number;
  }

  let add: AddFn;

  add = (n1: number, n2: number) => {
    return n1 + n2;
  };

  interface Named {
    readonly name: string;
  }

  interface Greetable extends Named {
    greet(phrase: string): void;
  }

  class Person implements Greetable {
    name: string;
    age = 30;
    constructor(name: string) {
      this.name = name;
    }
    greet(phrase: string) {
      console.log(`${phrase} ${this.name}`);
    }
  }

  const user = new Person("Mustafa");
  user.greet("Hello Im ");
};
