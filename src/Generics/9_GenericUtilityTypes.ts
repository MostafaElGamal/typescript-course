export default () => {
  // https://www.typescriptlang.org/docs/handbook/utility-types.html

  interface CourseGoal {
    title: string;
    desc: string;
    completeUntil: Date;
  }

  function creatCourseGoal(
    title: string,
    desc: string,
    date: Date,
  ): CourseGoal {
    // "Partial" is built in generic type that tell typescript that will be in the end the type that sended in the parameters
    // so what "Partial" type do is make the all of the propties in the object optional
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.desc = desc;
    courseGoal.completeUntil = date;
    return <CourseGoal>courseGoal;
  }

  // The "Readonly" generic makes the value that you assgin to
  // not changeable you know what I mean :D
  const names: Readonly<Array<string>> = ["Max", "Sports"];
  names.push("Manu");
}; // file end
