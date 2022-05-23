export default () => {
  interface Named {
    readonly name: string;
    age?: number;
    outputName?: string; // this tells typescript that might exsits or not.
  }

  interface Greetable extends Named {
    greet(phrase: string): void;
  }

  class Person implements Greetable {
    name: string;
    age?: number;
    constructor(name: string, age?: number) {
      this.name = name;
      this.age = age;
    }
    greet(phrase: string) {
      console.log(`${phrase} ${this.name}`);
    }
  }

  const user = new Person("Mustafa");
  user.greet("Hello Im ");
};
