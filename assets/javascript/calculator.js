// Variables
let bill = document.querySelector('.input-tip');
let billNumber = 0;
let people = document.querySelector('.person-tip');
let peopleNumber = 1;
let tipResult = document.querySelector('.amount');
let totalResult = document.querySelector('.result-amount');
let buttons = document.querySelectorAll('.button');
let alertMessage = document.querySelector('#alert');
let activeButton = null;

// Buttons function
let tipValue = 5;
buttons.forEach(element => {
  element.addEventListener('click', event => {
    // Changing button styles
    if (activeButton !== null) {
      activeButton.classList.remove('bottom:active');
      activeButton.style.backgroundColor = '';
    }
    element.classList.add('bottom:active');
    element.style.backgroundColor = '#85dcd1';
    activeButton = element;

    // Selection of tip elements
    tipValue = Number(event.target.innerText.slice(0, -1));
    calculateTip();
  });
});

// Tip amount calculation update
bill.addEventListener('input', () => {
  billNumber = parseFloat(bill.value);
  if (!isNaN(tipValue)) {
    calculateTip();
  }
});

// Custom calculation update
let custom = document.querySelector('#tip-amount');
custom.addEventListener('input', () => {
  tipValue = parseFloat(custom.value);
  if (!isNaN(tipValue)) {
    calculateTip();
  }
});

// People amount calculation update
people.addEventListener('input', () => {
  peopleNumber = parseInt(people.value);

  if (peopleNumber === 0 || isNaN(peopleNumber)) {
    people.style.borderColor = '#E17457';
    alertMessage.classList.add('error');
  } else {
    alertMessage.classList.remove('error');
    people.style.borderColor = 'white';
    calculateTip();
  }
});

// Reset button
let resetBtn = document.querySelector('#reset');
resetBtn.addEventListener('click', () => {
  bill.value = '';
  billNumber = 0;
  people.value = 1;
  peopleNumber = 1;
  if (activeButton !== null) {
    activeButton.classList.remove('bottom:active');
    activeButton.style.backgroundColor = '';
    activeButton = null;
  }
  calculateTip();
});

// Calculate tip and total amount
function calculateTip() {
  const MAX_CHARACTERS = 10; // Max characters to display
  const tipAmount = ((billNumber * tipValue / 100) / peopleNumber).toFixed(2);
  const totalAmount = (((billNumber * tipValue / 100) + billNumber) / peopleNumber).toFixed(2);

  tipResult.innerText = trimValue(tipAmount, MAX_CHARACTERS);
  totalResult.innerText = trimValue(totalAmount, MAX_CHARACTERS);
}

// Trim value to a specified number of characters
function trimValue(value, maxCharacters) {
  const stringValue = value.toString();
  if (stringValue.length > maxCharacters) {
    return stringValue.substring(0, maxCharacters);
  }
  return stringValue;
}
