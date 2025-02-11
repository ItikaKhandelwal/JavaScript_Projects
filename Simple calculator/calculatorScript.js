const number1Input = document.getElementById('number1');
const number2Input = document.getElementById('number2');
const operationSelect = document.getElementById('operation');
const calculateButton = document.getElementById('calculate');
const resultSpan = document.getElementById('result');

calculateButton.addEventListener('click', () => {
  const number1 = parseFloat(number1Input.value);
  const number2 = parseFloat(number2Input.value);
  const operation = operationSelect.value;

  if (isNaN(number1) || isNaN(number2)) {
    resultSpan.textContent = 'Please enter valid numbers!';
    return;
  }

  let result = 0;
  switch (operation) {
    case 'add':
      result = number1 + number2;
      break;

    case 'subtract':
      result = number1 - number2;
      break;

    case 'multiply':
      result = number1 * number2;
      break;

    case 'divide':
      if (number2 === 0) {
        resultSpan.textContent = 'Infinite';
        return;
      }
      result = number1 / number2;
      break;
      
    default:
      result = 'Invalid operation';
  }

  resultSpan.textContent = result;
});
