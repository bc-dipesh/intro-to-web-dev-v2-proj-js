let runningTotal = 0;
let buffer = '0';
let previousOperator;
const screen = document.querySelector('.screen');

function reRender() {
	screen.innerText = buffer;
}

function flushOperation(intBuffer) {
	switch (previousOperator) {
		case '+':
			runningTotal += intBuffer;
			break;
		case '-':
			runningTotal -= intBuffer;
			break;
		case '*':
			runningTotal *= intBuffer;
			break;
		case '÷':
			runningTotal /= intBuffer;
			break;
		default:
			console.log('invalid operator');
	}
}

function handleMath(value) {
	const intBuffer = parseInt(buffer);

	if (runningTotal === 0) {
		runningTotal = intBuffer;
	} else {
		flushOperation(intBuffer);
	}

	previousOperator = value;
	buffer = '0';
}

function handleSymbol(value) {
	switch (value) {
		case 'C':
			buffer = '0';
			runningTotal = 0;
			previousOperator = null;
			break;
		case '=':
			if (previousOperator === null) {
				return;
			}
			flushOperation(parseInt(buffer));
			previousOperator = null;
			buffer = '' + runningTotal;
			runningTotal = 0;
			break;
		case '←':
			if (buffer.length === 1) {
				buffer = '0';
			} else {
				buffer = buffer.substr(0, buffer.length - 1);
			}
			break;
		default:
			handleMath(value);
			break;
	}
}

function handleNumber(value) {
	if (buffer === '0') {
		buffer = value;
	} else {
		buffer += value;
	}
}

function buttonClick(value) {
	if (isNaN(parseInt(value))) {
		handleSymbol(value);
	} else {
		handleNumber(value);
	}
	reRender();
}

document
	.querySelector('.calc-buttons')
	.addEventListener('click', function (event) {
		buttonClick(event.target.innerText);
	});
