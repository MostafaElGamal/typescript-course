// import lodash from "lodash";
import "reflect-metadata";
import { plainToClass } from "class-transformer"; // Create an instance of ceartin class like the "plainToClassExample"
import { Product } from "./product.modal";
import { validate } from "class-validator";

// declare var GLOBAL: any;
// console.log(GLOBAL, "GLOBAL");

export default () => {
  // console.log(lodash.shuffle([1, 2, 3]));

  const products = [
    { title: "A Carpet", price: 28.99 },
    { title: "A Book", price: 10.99 },
  ];

  const newProd = new Product("", -11.2);
  validate(newProd).then((erros) => {
    if (erros.length > 0) {
      console.log("VALIDATION ERRORS");
      console.log(erros);
    } else {
      console.log(newProd.getInformation());
    }
  });

  const p1 = new Product("A Book", 12.99);

  // const loadedProducts = products.map((prod) => {
  //   return new Product(prod.title, prod.price);
  // });

  const loadedProducts = plainToClass(Product, products); //

  for (const prod of loadedProducts) {
    console.log(prod.getInformation());
  }
};
