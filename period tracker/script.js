var periodDates = [];

document.getElementById('add-button').addEventListener('click', addPeriodDate);
document.getElementById('calculate-button').addEventListener('click', calculateCycleLength);

function addPeriodDate() {
  var inputContainer = document.getElementById('input-container');
  var inputRow = document.createElement('div');
  inputRow.classList.add('input-row');

  var label = document.createElement('label');
  label.textContent = 'Period Date:';
  var input = document.createElement('input');
  input.type = 'date';
  input.classList.add('period-date');

  inputRow.appendChild(label);
  inputRow.appendChild(input);
  inputContainer.appendChild(inputRow);
}

function calculateCycleLength() {
  var periodInputs = document.getElementsByClassName('period-date');

  if (periodInputs.length < 2) {
    alert('Please enter at least two period dates to calculate the cycle length.');
    return;
  }

  periodDates = [];

  for (var i = 0; i < periodInputs.length; i++) {
    var dateValue = periodInputs[i].value;
    if (dateValue !== '') {
      periodDates.push(new Date(dateValue));
    }
  }

  if (periodDates.length < 2) {
    alert('Please enter at least two valid period dates to calculate the cycle length.');
    return;
  }

  var cycleLength = calculateAverageCycleLength(periodDates);

  var resultContainer = document.getElementById('result-container');
  resultContainer.innerHTML = 'Your average cycle length is ' + cycleLength + ' days.';
}

function calculateAverageCycleLength(periodDates) {
  var totalDays = 0;
  for (var i = 1; i < periodDates.length; i++) {
    var diff = periodDates[i] - periodDates[i - 1];
    totalDays += Math.round(diff / (1000 * 60 * 60 * 24));
  }

  var averageCycleLength = Math.round(totalDays / (periodDates.length - 1));
  return averageCycleLength;
}

