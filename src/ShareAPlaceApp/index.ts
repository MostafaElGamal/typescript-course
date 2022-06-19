export default () => {
  const form = document.querySelector("form")!;
  const addressInput = <HTMLInputElement>document.getElementById("address")!;

  function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;

    // SEND THIS TO Google's APIS;
    // You can't continue because you don't have API KEY
  }
  form.addEventListener("submit", (event: Event) => {
    event.preventDefault();
  });
};
