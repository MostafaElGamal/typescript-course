export default () => {
  const fetchUserData = {
    id: "u1",
    name: "max",
    job: { title: "CEO", description: "My Own Company" },
  };

  // This is optional chaining that allows you to check if the object proprety exists or not.
  console.log(fetchUserData?.job?.title);
}; // file end
