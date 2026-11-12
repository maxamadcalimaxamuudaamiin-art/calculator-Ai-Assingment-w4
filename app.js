const result = document.getElementById("result");
const previous = document.getElementById("previous");

let currentNumber = "0";
let firstNumber = null;
let operator = null;
let shouldReset = false;

// Update display
function updateDisplay() {
  result.textContent = currentNumber;
}

// Add numbers and decimal points
function appendNumber(number) {

  if (currentNumber === "Error") {
    currentNumber = "0";
  }

  if (shouldReset) {
    currentNumber = number === "." ? "0." : number;
    shouldReset = false;
  }

  else if (number === "." && currentNumber.includes(".")) {
    return;
  }

  else {
    currentNumber =
      currentNumber === "0" && number !== "."
        ? number
        : currentNumber + number;
  }

  updateDisplay();
}

// Select mathematical operator
function chooseOperator(selectedOperator) {

  if (currentNumber === "Error") return;

  if (operator !== null && !shouldReset) {
    calculate();
  }

  firstNumber = parseFloat(currentNumber);
  operator = selectedOperator;
  shouldReset = true;

  previous.textContent = `${firstNumber} ${operator}`;
}

// Calculate result
function calculate() {

  if (operator === null || shouldReset) return;

  const secondNumber = parseFloat(currentNumber);

  let answer;

  switch (operator) {

    case "+":
      answer = firstNumber + secondNumber;
      break;

    case "-":
      answer = firstNumber - secondNumber;
      break;

    case "×":
      answer = firstNumber * secondNumber;
      break;

    case "÷":

      if (secondNumber === 0) {
        currentNumber = "Error";
        previous.textContent = "Cannot divide by zero";

        operator = null;
        firstNumber = null;
        shouldReset = true;

        updateDisplay();
        return;
      }

      answer = firstNumber / secondNumber;
      break;
  }

  // Avoid long floating-point results
  answer = Number(answer.toPrecision(12));

  // Show previous calculation
  previous.textContent =
    `${firstNumber} ${operator} ${secondNumber} =`;

  currentNumber = String(answer);

  operator = null;
  firstNumber = null;
  shouldReset = true;

  updateDisplay();
}

// Clear calculator
function clearCalculator() {

  currentNumber = "0";
  firstNumber = null;
  operator = null;
  shouldReset = false;

  previous.textContent = "";

  updateDisplay();
}

// Number buttons
document.querySelectorAll("[data-number]").forEach(button => {

  button.addEventListener("click", () => {
    appendNumber(button.dataset.number);
  });

});

// Operator buttons
document.querySelectorAll("[data-operator]").forEach(button => {

  button.addEventListener("click", () => {
    chooseOperator(button.dataset.operator);
  });

});

// Equal button
document.querySelector('[data-action="calculate"]')
  .addEventListener("click", calculate);

// Clear button
document.querySelector('[data-action="clear"]')
  .addEventListener("click", clearCalculator);