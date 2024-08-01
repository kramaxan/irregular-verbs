import db from './data.json' with { type: 'json' };

const buttons = document.querySelectorAll('[data-action-button]');
const startButton = document.querySelector('[data-action-button="start"]');
const resetButton = document.querySelector('[data-action-button="reset"]');
const verb = document.querySelector('[data-verb-label]');
const quizInputs = document.querySelector('[data-quiz-inputs]');
const counterLabel = document.querySelector('[data-counter-label]');
const inputs = document.querySelectorAll('[data-verb-form]');
const inputV1 = document.querySelector('[data-verb-form="v1"]');
const inputV2 = document.querySelector('[data-verb-form="v2"]');
const inputV3 = document.querySelector('[data-verb-form="v3"]');

const TOTAL_VERBS_AMOUNT = 20;

let data;
let COUNTER;
let CURRENT_VERB_INDEX;
let CORRECT_ANSWERS;

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

function onDOMContentLoaded() {
    addEventListeners();
    reset();
}

function reset() {
    resetButton.classList.add('disabled');
    quizInputs.classList.add('disabled');

    resetInputs();

    COUNTER = 0;
    CURRENT_VERB_INDEX = 0;
    CORRECT_ANSWERS = 0;

    verb.innerText = 'press start';
    counterLabel.innerText = `${COUNTER}/${TOTAL_VERBS_AMOUNT}`;

    data = shuffle(db).slice(0, TOTAL_VERBS_AMOUNT);

    startButton.classList.remove('disabled');
}

function start() {
    startButton.classList.add('disabled');

    verb.innerText = data[CURRENT_VERB_INDEX].verb;
    counterLabel.innerText = `${++COUNTER}/${TOTAL_VERBS_AMOUNT}`;

    resetButton.classList.remove('disabled');
    quizInputs.classList.remove('disabled');
}

function update() {
    resetInputs();

    verb.innerText = data[++CURRENT_VERB_INDEX].verb;
    counterLabel.innerText = `${++COUNTER}/${TOTAL_VERBS_AMOUNT}`;
}

function check() {
    const { userV1, userV2, userV3 } = getUserInput();
    let currentVerb = data[CURRENT_VERB_INDEX];

    if (userV1 === currentVerb.v1) {
        inputV1.classList.replace('wrong', 'correct') || inputV1.classList.add('correct');
    } else {
        inputV1.classList.replace('correct', 'wrong') || inputV1.classList.add('wrong');
    }

    if (userV2 === currentVerb.v2) {
        inputV2.classList.replace('wrong', 'correct') || inputV2.classList.add('correct');
    } else {
        inputV2.classList.replace('correct', 'wrong') || inputV2.classList.add('wrong');
    }

    if (userV3 === currentVerb.v3) {
        inputV3.classList.replace('wrong', 'correct') || inputV3.classList.add('correct');
    } else {
        inputV3.classList.replace('correct', 'wrong') || inputV3.classList.add('wrong');
    }
}

function next() {
    stats();

    if (COUNTER === data.length) {
        end();
    } else {
        update();
    }
}

function end() {
    alert(`Testing is complete. Correct answers: ${CORRECT_ANSWERS}/${TOTAL_VERBS_AMOUNT}`);
    reset();
}

function getUserInput() {
    return { userV1: inputV1.value, userV2: inputV2.value, userV3: inputV3.value };
}

function stats() {
    const { userV1, userV2, userV3 } = getUserInput();
    let currentVerb = data[CURRENT_VERB_INDEX];

    if (userV1 === currentVerb.v1 && userV2 === currentVerb.v2 && userV3 === currentVerb.v3) {
        CORRECT_ANSWERS++;
    }
}

function resetInputs() {
    inputs.forEach((input) => {
        input.value = '';

        if (input.classList.contains('wrong')) {
            input.classList.remove('wrong');
        }
        if (input.classList.contains('correct')) {
            input.classList.remove('correct');
        }
    });
}

function addEventListeners() {
    buttons.forEach((button) => {
        const buttonId = button.dataset.actionButton;
        switch (buttonId) {
            case 'start':
                button.addEventListener('click', start);
                break;
            case 'reset':
                button.addEventListener('click', reset);
                break;
            case 'check':
                button.addEventListener('click', check);
                break;
            case 'next':
                button.addEventListener('click', next);
                break;
            default:
                alert('default()');
        }
    });
}

function shuffle(array) {
    let currentIndex = array.length,
        randomIndex;

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}
