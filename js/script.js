// buttons
const btnContinue = document.querySelector(".btn-continue");

// form
const ccInput = document.querySelector('input[name="card number"]');
const nameInput = document.querySelector('input[name="name"]');
const expMonthInput = document.querySelector(
  'input[name="exp-month"]'
);
const expYearInput = document.querySelector('input[name="exp-year"]');
const cvcInput = document.querySelector(`input[name="cvc"]`);
const form = document.querySelector(".form");
const formContainer = document.querySelector(".card-form");

// cards
const ccFrontNum = document.querySelector(".card__front-numbers");
const ccName = document.querySelector(".card__name");
const ccExpMonth = document.querySelector(".cc-month");
const ccExpYear = document.querySelector(".cc-year");
const ccCVC = document.querySelector(".card__back-cvc");

// COMPLETE
const thankYouMessage = document.querySelector(".complete");

// ERRORS
// const errorEl = document.querySelector(".error");

class AppError extends Error {
  constructor(errors) {
    super();
    this.errors = errors;
  }
}

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
function displayError(errors) {
  errors.forEach(error => {
    const markup = `<span class='alert'>${error.message}</span>`;
    error.target.classList.add("invalid");
    error.target.parentElement.insertAdjacentHTML(
      "beforeend",
      markup
    );
  });
}

function removeError(target) {
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

// FORM SUBMITION
form.addEventListener("submit", event => {
  try {
    event.preventDefault();
    const formData = new FormData(form);

    // ERROR HANDLEING
    removeError(event.target);
    let errorsArr = [];
    //

    // CHECK IF INPUT VALUES ARE CORRECT
    for (const [key, value] of formData.entries()) {
      const target = document.querySelector(`input[name="${key}"]`);

      // check if numeric inputs contain letters
      if (key !== "name" && value.match(/[a-z]/i)) {
        errorsArr.push({
          target,
          message: "Wrong format, numbers only",
        });
      }
      // Check for empty fields
      if (value === "") {
        errorsArr.push({ target, message: "Can't be blank" });
      }
    }
    //

    // ERROR HANDLER
    if (errorsArr.length > 0) {
      throw new AppError(errorsArr);
    }
    // IF NO ERRORS CONTINUE TO NEXT PAGE
    formContainer.setAttribute("data-hidden", true);
    thankYouMessage.setAttribute("data-hidden", false);
    //

    // CLEAR FORM
    form.reset();
  } catch (error) {
    displayError(error.errors);
  }
});

// GO BACK TO THE FORM AFTER WHEN AT THE THANK YOU PAGE
btnContinue.addEventListener("click", () => {
  formContainer.setAttribute("data-hidden", false);
  thankYouMessage.setAttribute("data-hidden", true);
});
