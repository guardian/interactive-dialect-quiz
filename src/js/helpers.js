import {updateUI, markAnswers} from './ui'

var questions;
var questionsBackup;
var currentQuestion;
var correct = 0;
var total = 0;

export function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

export function newQuestion(initialQuestions) {
	if(initialQuestions) {
		questions = initialQuestions;
		questionsBackup = initialQuestions;
	}

	if(questions.length === 0) {
		var endEl = document.createElement('div');
		endEl.className = "end-message";
		endEl.innerHTML = "You correctly guessed " + correct + " definitions out of " + total;
		document.body.appendChild(endEl);
		return;
	}

	const questionKey = Math.round(Math.random()*(questions.length - 1))
	const question = questions[questionKey];
	questions.splice(questionKey, 1);

	currentQuestion = question;
	const extraAnswers = generateAnswers(question, 2);

	updateUI(question, extraAnswers);
}

export function generateAnswers(question, count) {
	var answers = [question.definition];

	let questionBank = (questions.length < 5) ? questionsBackup : questions;

	for(let i = 0; i < count; i++) {
		const questionKey = Math.round(Math.random()*(questionBank.length - 1));
		const answer = questionBank[questionKey].definition;

		answers.push(answer);
	}

	return shuffleArray(answers);
}

export function setupListeners(questionEl) {
	let answersEl = questionEl.querySelector(".interactive-quiz__answers");
	let nextEl = questionEl.querySelector(".interactive-quiz__next");

	answersEl.addEventListener("click", (event) => {
		if(event.target.parentNode.classList.contains("interactive-quiz__answers")) {
			checkAnswer(event.target.innerHTML, questionEl);
		}
	});

	nextEl.addEventListener("click", (event) => {
		nextEl.remove();
		newQuestion();
	});
}

export function checkAnswer(answer, questionEl) {
	if(questionEl.classList.contains("answered")) {
		return;
	}

	let previousEl = questionEl.querySelector(".interactive-quiz__previous");
	let previousP = questionEl.querySelector(".interactive-quiz__previous p");

	markAnswers(answer, currentQuestion.definition, questionEl);

	total++;
	questionEl.setAttribute("data-total", total);
	let correctText = (answer == currentQuestion.definition) ? "Correct! ": "Incorrect! ";
	let textColor = (answer == currentQuestion.definition) ? "#298422": "#cc2b12";

	if(answer == currentQuestion.definition) {
		correct++;
		questionEl.setAttribute("data-correct", correct);
	} else {
		questionEl.setAttribute("data-correct", correct);
	}

	previousP.innerHTML = `<b style="color: ${textColor};">${correctText}</b>
							<b style='text-transform: capitalize;'>${currentQuestion.word}</b>
							means <b>${currentQuestion.definition}</b>, it was reported in <b>${currentQuestion.where}</b>`;

	window.resize();
}

export function initPlayButtons() {
	document.body.addEventListener("click", (e) => {
		if(e.target.classList.contains("word__audio-button")) {
			let audioEl = e.target.parentNode.querySelector("audio");
			if(e.target.classList.contains("playing")) {
				audioEl.pause();
				e.target.classList.remove("playing");
			} else {
				audioEl.play();
				e.target.classList.add("playing");

				audioEl.addEventListener("ended", (e2) => {
					audioEl.pause();
					e.target.classList.remove("playing");
				});
			}
		}
	});
}