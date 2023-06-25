document.getElementById('calculate-button').addEventListener('click', calculatePeriod);

function calculatePeriod() {
  var lastPeriodDate = new Date(document.getElementById('last-period-date').value);
  var cycleLength = parseInt(document.getElementById('cycle-length').value);

  if (isNaN(cycleLength)) {
    alert('Please enter a valid cycle length.');
    return;
  }

  var nextPeriodDate = new Date(lastPeriodDate);
  nextPeriodDate.setDate(nextPeriodDate.getDate() + cycleLength);

  var resultContainer = document.getElementById('result-container');
  resultContainer.innerHTML = 'Your next period is expected on ' + nextPeriodDate.toDateString() + '.';
}
