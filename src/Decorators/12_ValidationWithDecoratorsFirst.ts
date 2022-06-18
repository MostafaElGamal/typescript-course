export default () => {
  class Course {
    title: string;
    price: number;

    constructor(t: string, p: number) {
      this.title = t;
      this.price = p;
    }
  }

  const courseForm = document.querySelector("form")!;
  courseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const titleEl = <HTMLInputElement>document.getElementById("title");
    const priceEl = <HTMLInputElement>document.getElementById("price");

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);

    console.log(createdCourse);
  });
}; // file-end
