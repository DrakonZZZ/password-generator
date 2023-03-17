const generatePass = document.getElementById('generated-password-text');
const copy = document.querySelector('.copy');
const charLength = document.querySelector('.char-length');
const slider = document.getElementById('pass-range');
const upperCaseCheck = document.getElementById('uppercase');
const lowerCaseCheck = document.getElementById('lowercase');
const numbersCheck = document.getElementById('numbers');
const symbolsCheck = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');

const lowerLetters = 'abcdefghijklmnopqrstuvwxyz';
const upperLetters = lowerLetters.toUpperCase();
const numbers = '1234567890';
const symbols = '!@#$%&*~_-';
let selectedOptionGeneration = [];

const global = {
  length: 4,
  upperCaseFlag: false,
  lowerCaseFlag: false,
  numberFlag: false,
  symbolsFlag: false,
};

// character length value

const characterLength = () => {
  charLength.innerHTML = slider.value;
  global.length = slider.value;
};

//generating password for selected options

const generatingPassSequence = (e) => {
  selectedOptionGeneration = [];
  e.preventDefault();

  //   checking if any option is selected
  if (
    global.upperCaseFlag === false &&
    global.lowerCaseFlag === false &&
    global.numberFlag === false &&
    global.symbolsFlag === false
  ) {
    alert('please select an option');
    return;
  }

  if (global.upperCaseFlag === true) {
    for (let i = 0; i <= global.length; i++) {
      selectedOptionGeneration.push(
        upperLetters[Math.floor(Math.random() * 26)]
      );
    }
  }
  if (global.lowerCaseFlag === true) {
    for (let i = 0; i <= global.length; i++) {
      selectedOptionGeneration.push(
        lowerLetters[Math.floor(Math.random() * 26)]
      );
    }
  }
  if (global.numberFlag === true) {
    for (let i = 0; i <= global.length; i++) {
      selectedOptionGeneration.push(numbers[Math.floor(Math.random() * 10)]);
    }
  }
  if (global.symbolsFlag === true) {
    for (let i = 0; i <= global.length; i++) {
      selectedOptionGeneration.push(symbols[Math.floor(Math.random() * 10)]);
    }
  }
  const selected = selectedOptionGeneration.join('');
  const finalPasscode = generatePasscode(selected);
  passStrength();
  generatePass.innerText = finalPasscode;
};

function generatePasscode(selected) {
  const pass = [];
  for (let i = 0; i <= global.length - 1; i++) {
    pass.push(selected[Math.floor(Math.random() * selected.length)]);
  }
  return pass.join('');
}

function passStrength() {}

// Copying text to clipboard using clipboard api

async function copyToClipboard() {
  const textCopy = generatePass.innerText;
  try {
    await navigator.clipboard.writeText(textCopy);
    const tooltip = document.querySelector('.tooltip-text');
    tooltip.classList.add('tooltip-text-view');
    tooltip.innerText = 'Copied to clipboard';
    setTimeout(() => {
      tooltip.classList.remove('tooltip-text-view');
      tooltip.innerText = '';
    }, 2000);
  } catch (err) {
    console.log('failed to copy', err);
  }
}

function resetOptions() {
  const checkbox = Array.from(document.getElementsByClassName('checkbox'));
  checkbox.forEach((check) => (check.checked = false));
  slider.value = global.length;
}

// events

const eventHandlers = () => {
  resetOptions();

  slider.addEventListener('input', characterLength);
  upperCaseCheck.addEventListener('input', () => {
    global.upperCaseFlag === true
      ? (global.upperCaseFlag = false)
      : (global.upperCaseFlag = true);
  });

  lowerCaseCheck.addEventListener('input', () => {
    global.lowerCaseFlag === true
      ? (global.lowerCaseFlag = false)
      : (global.lowerCaseFlag = true);
  });

  numbersCheck.addEventListener('input', () => {
    global.numberFlag === true
      ? (global.numberFlag = false)
      : (global.numberFlag = true);
  });

  symbolsCheck.addEventListener('input', () => {
    global.symbolsFlag === true
      ? (global.symbolsFlag = false)
      : (global.symbolsFlag = true);
  });

  generateBtn.addEventListener('click', generatingPassSequence);
  copy.addEventListener('click', copyToClipboard);
};

document.addEventListener('DOMContentLoaded', eventHandlers);
