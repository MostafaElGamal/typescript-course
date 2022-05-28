export default () => {
  type Combinable = string | number;

  // This is function overloads that mean you can specify more the type of the function.
  function add(a: number, b: number): number;
  function add(a: string, b: string): string;
  function add(a: number, b: string): string;
  function add(a: string, b: number): string;
  function add(a: Combinable, b: Combinable) {
    if (typeof a == "string" || typeof b == "string") {
      return a.toString() + blur.toString();
    }
    return a + b;
  }

  const result = <String>add("Mustafa", "Schwarz");
  result.split("");
}; // file end
