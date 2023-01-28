const ccInput = document.querySelector(`input[name="card number"]`);


ccInput.addEventListener('input', (event) => {
  let ccNumber = event.target;
  let formattedNumber;
  const ccNumberLength = ccNumber.value.split("").length;
  const possibleCCNumberLength = [4, 9, 14];
  // if (
  //   ccNumberLength === 4 ||
  //   ccNumberLength === 9 ||
  //   ccNumberLength === 14
  // ) {
  //   formattedNumber = `${ccNumber.value} `;
  //   ccNumber.value =
  //     formattedNumber === undefined ? "" : formattedNumber;
  // }

  if (possibleCCNumberLength.includes(ccNumberLength)  ) {
    formattedNumber = `${ccNumber.value} `;
    ccNumber.value =
      formattedNumber === undefined ? "" : formattedNumber;
  }




  // if (number.split("").length === 8) {
  //   formattedNumber = `${number} 1234`;
  // }
})
