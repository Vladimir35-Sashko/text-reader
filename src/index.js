import Notiflix from 'notiflix';
const button = document.querySelector('.process-btn');
button.addEventListener('click', onClick);

function onClick() {
  const input = document.getElementById('fileInput');
  const file = input.files[0];

  if (!file) {
    Notiflix.Notify.warning('Будь ласка, виберіть файл');    
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    const content = event.target.result;
    const numbers = content.split(/[\s\n]+/).map(Number);
    let isValid = true;

    for (const num of numbers) {
      if (isNaN(num)) {
        isValid = false;
        break;
      }
    }

    if (!isValid) {
      Notiflix.Notify.failure(
        'Файл повинен містити тільки числа.'
      );
      return;
    }

    let maxValue = -Infinity;
    let minValue = Infinity;
    let sum = 0;
    let count = 0;

    for (const num of numbers) {
      if (num > maxValue) maxValue = num;
      if (num < minValue) minValue = num;
      sum += num;
      count++;
    }

    const averageValue = sum / count;
    numbers.sort((a, b) => a - b);
    let medianValue;
    if (numbers.length % 2 === 0) {
      medianValue =
        (numbers[numbers.length / 2 - 1] + numbers[numbers.length / 2]) / 2;
    } else {
      medianValue = numbers[(numbers.length - 1) / 2];
    }

    document.getElementById('maxValue').textContent = maxValue;
    document.getElementById('minValue').textContent = minValue;
    document.getElementById('averageValue').textContent =
      averageValue.toFixed(2);
    document.getElementById('medianValue').textContent = medianValue.toFixed(2);
  };

  reader.readAsText(file);
}
