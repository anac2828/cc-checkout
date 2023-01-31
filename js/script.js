// form
const ccInput = document.querySelector(`input[name="card number"]`);
const nameInput = document.querySelector(`input[name="name"]`);
const expMonthInput = document.querySelector('#exp-month');
const expYearInput = document.querySelector('#exp-year');
const cvcInput = document.querySelector(`input[name="cvc"]`)

// cards
const ccFrontNum = document.querySelector('.card__front-numbers');
const ccName = document.querySelector('.card__name');
const ccExpMonth = document.querySelector('.cc-month');
const ccExpYear = document.querySelector('.cc-year');
const ccCVC = document.querySelector('.card__back-cvc');

function formatCCNumber(possibleCCNumberLengths, userEnteredCCNumber) {
  
  let formattedCCNumber = userEnteredCCNumber.value;
  
  const ccNumberLength = userEnteredCCNumber.value.split("").length;
  
  if (possibleCCNumberLengths.includes(ccNumberLength)) {
    formattedCCNumber = `${formattedCCNumber} `;

  }
  
  return formattedCCNumber = formattedCCNumber === undefined ? '' : formattedCCNumber
}


// EVENT LISTENERS
// update credit card number
ccInput.addEventListener('input', () => {
  const possibleCCNumberLength = [4, 9, 14];
  const possibleAMXNumberLength = [4, 11];

  // UPDATE CREDIT CARD with user entered info
ccFrontNum.textContent = ccInput.value

  // FORMAT CREDIT CARD
  if (!ccInput.value.startsWith('3')) {
    ccInput.maxLength = 19;
    return ccInput.value = formatCCNumber(
      possibleCCNumberLength,
      ccInput
    );
  }
  
  ccInput.maxLength = 17;
  return ccInput.value = formatCCNumber(possibleAMXNumberLength, ccInput);
})

// update name
nameInput.addEventListener('input', () => {
  ccName.textContent = nameInput.value
})

// update experation date

expMonthInput.addEventListener('input', () => {
  ccExpMonth.textContent = expMonthInput.value;
})

expYearInput.addEventListener('input', () => {
  ccExpYear.textContent = expYearInput.value; 
})

// update cvc 
cvcInput.addEventListener('input', () => {ccCVC.textContent = cvcInput.value})