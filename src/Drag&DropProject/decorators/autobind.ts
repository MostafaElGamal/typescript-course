namespace App {
  export function AutoBind(
    _: any,
    _2: string,
    descriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const orignalValue = descriptor.value;
    const objDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        return orignalValue.bind(this);
      },
    };
    return objDescriptor;
  }
}
