// form
const ccInput = document.querySelector('input[name="card number"]');
const nameInput = document.querySelector('input[name="name"]');
const expMonthInput = document.querySelector(
  'input[name="exp-month"]'
);
const expYearInput = document.querySelector('input[name="exp-year"]');
const cvcInput = document.querySelector(`input[name="cvc"]`);
const form = document.querySelector(".form");

// cards
const ccFrontNum = document.querySelector(".card__front-numbers");
const ccName = document.querySelector(".card__name");
const ccExpMonth = document.querySelector(".cc-month");
const ccExpYear = document.querySelector(".cc-year");
const ccCVC = document.querySelector(".card__back-cvc");

// ERRORS
const errorEl = document.querySelector(".error");


// HELPER FUNCTIONS
function formatCCNumber(
  possibleCCNumberLengths,
  userEnteredCCNumber
) {
  let formattedCCNumber = userEnteredCCNumber.value;

  const ccNumberLength = userEnteredCCNumber.value.split("").length;

  if (possibleCCNumberLengths.includes(ccNumberLength)) {
    formattedCCNumber = `${formattedCCNumber} `;
  }

  userEnteredCCNumber.value =
    userEnteredCCNumber.value === undefined ? "" : formattedCCNumber;
}

// ERROR HANDLER
function displayError(message = "Can't be blank", key) {
  const target = document.querySelector(`input[name="${key}"]`);
  const markup = `<span class='alert'>${message}</span>`;
  target.classList.add("invalid");
  target.parentElement.insertAdjacentHTML("beforeend", markup);
}

function removeError(target) {
  console.log(target.parentElement);
  target.parentElement;
}

//******* EVENT LISTENERS

// // update credit card number
// ccInput.addEventListener("input", () => {
//   const possibleCCNumberLength = [4, 9, 14];
//   const possibleAMXNumberLength = [4, 11];

//   // UPDATE CREDIT CARD with user entered info
//   ccFrontNum.textContent = ccInput.value;

//   // FORMAT CREDIT CARD
//   if (!ccInput.value.startsWith("3")) {
//     ccInput.maxLength = 19;
//     return (ccInput.value = formatCCNumber(
//       possibleCCNumberLength,
//       ccInput
//     ));
//   }

//   ccInput.maxLength = 17;
//   return (ccInput.value = formatCCNumber(
//     possibleAMXNumberLength,
//     ccInput
//   ));
// });

// // update name
// nameInput.addEventListener("input", event => {
//   removeError(event.target);
//   ccName.textContent = nameInput.value;
// });

// // update experation date

// expMonthInput.addEventListener("input", () => {
//   ccExpMonth.textContent = expMonthInput.value;
// });

// expYearInput.addEventListener("input", () => {
//   ccExpYear.textContent = expYearInput.value;
// });

// // update cvc
// cvcInput.addEventListener("input", () => {
//   ccCVC.textContent = cvcInput.value;
// });

// const formData = new FormData(form);

// for (const [key, value] of formData.entries()) {
//   let cardElement = document.querySelector(
//     `[data-form-input="${key}"]`
//   );
//   let formInput = document.querySelector(`[name="${key}"]`);

//   formInput.addEventListener("input", () => {
//     console.log("event listener: ", value);
//     cardElement.textContent = value;
//   });
// }

["input", "click"].forEach(e => {
  form.addEventListener(e, event => {
    let CCNumber;
    const elementName = event.target.tagName;
    const selectedFormInput = event.target;

    if (elementName != "INPUT") return;

    // Get input value
    selectedFormInput.addEventListener("input", event => {
      const input = event.target;
      const inputAttribute = input.attributes.name.value;
      const cardElement = document.querySelector(
        `[data-form-input="${inputAttribute}"]`
      );
      console.log(event.type, inputAttribute);
      console.log(event.target);
      console.log(cardElement);
      // Format CC number
      if (inputAttribute === "card number") {
        const cardType = input.value.startsWith("3")
          ? "amx"
          : "other";

        input.maxLength = cardType === "amx" ? 17 : 19;
        const possibleCCNumberLength =
          cardType === "amx" ? [4, 11] : [4, 9, 14];

        CCNumber = formatCCNumber(possibleCCNumberLength, input);
        cardElement.textContent = CCNumber;
      }

      // change text content on front and back of card
      cardElement.textContent = input.value;
    });
  });
});

// FORM SUBMITION227567
form.addEventListener("submit", event => {
  event.preventDefault();

  const formData = new FormData(form);

  for (const [key, value] of formData.entries()) {
    if (key !== "name" && value.match(/[a-z]/i)) {
      const message = "Wrong format, numbers only";
      displayError(message, key);
    }
    if (value === "") {
      const message = "Can't be blank";
      displayError(message, key);
    }
  }
});