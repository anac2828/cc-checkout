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
function displayError(message = "Can't be blank", target) {
  const markup = `<span class='alert'>${message}</span>`;
  target.classList.add("invalid");
  target.parentElement.insertAdjacentHTML("beforeend", markup);
}

function removeError(target) {
  console.log(target.parentElement);
  if (target.parentElement.children[0].tagName === "BUTTON") return;
  const alert = target.parentElement.querySelector(".alert");
  if (!alert) return;
  target.classList.remove("invalid");
  alert.remove();
}

//******* EVENT LISTENERS

["input", "click"].forEach(e => {
  form.addEventListener(e, event => {
    const elementName = event.target.tagName;
    const input = event.target;
    removeError(input);
    if (elementName && event.type.toUpperCase() != "INPUT") return;

    // Get input value
    const inputAttribute = input.attributes.name.value;
    const cardElement = document.querySelector(
      `[data-form-input="${inputAttribute}"]`
    );

    // Format CC number
    if (inputAttribute === "card number") {
      let CCNumber;
      const cardType = input.value.startsWith("3") ? "amx" : "other";
      const possibleCCNumberLength =
        cardType === "amx" ? [4, 11] : [4, 9, 14];

      input.maxLength = cardType === "amx" ? 17 : 19;

      CCNumber = formatCCNumber(possibleCCNumberLength, input);
      cardElement.textContent = CCNumber;
    }

    // change text content on front and back of card
    cardElement.textContent =
      input.value === ""
        ? input.placeholder.replace("e.g. ", "")
        : input.value;
  });
});

// FORM SUBMITION227567
form.addEventListener("submit", event => {
  event.preventDefault();

  const formData = new FormData(form);

  for (const [key, value] of formData.entries()) {
    const target = document.querySelector(`input[name="${key}"]`);

    // check if numeric inputs contain letters
    if (key !== "name" && value.match(/[a-z]/i)) {
      removeError(target);
      const message = "Wrong format, numbers only";
      displayError(message, target);
    }
    if (value === "") {
      removeError(target);
      const message = "Can't be blank";
      displayError(message, target);
    }
  }
});