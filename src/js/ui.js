import {setupListeners} from './helpers'

export function updateUI(question, answers) {
    var newQuestion = document.createElement('div');
    newQuestion.classList.add("interactive-quiz");
    newQuestion.innerHTML = '<div class="interactive-quiz__word">' + question.word + '</div><ul class="interactive-quiz__answers"></ul><div class="interactive-quiz__previous"><p></p><button class="interactive-quiz__next">Next question</button></div>';

    var newQuestionEl = document.body.appendChild(newQuestion);

    // previousEl.classList.remove("correct");
    // previousEl.classList.remove("incorrect");
    // previousP.innerHTML = "";

    // answersEl.innerHTML = "";

    let answersEl = newQuestionEl.querySelector(".interactive-quiz__answers");
    let submitButtonEl = newQuestionEl.querySelector(".interactive-quiz__submit");
    let previousEl = newQuestionEl.querySelector(".interactive-quiz__previous");
    let previousP = newQuestionEl.querySelector(".interactive-quiz__previous p");

    answers.forEach((answer) => {
    	answersEl.innerHTML += "<li>" + answer + "</li>";
    });

    setupListeners(newQuestionEl);

    setTimeout(() => {
    	newQuestionEl.style.opacity = 1;
    }, 0);

    window.resize();
}

export function markAnswers(answer, definition, questionEl) {
	let answers = questionEl.querySelectorAll(".interactive-quiz__answers li");
	questionEl.classList.add("answered");

	// for(var i = 0; i < answers.length; i++) {
	// 	answers[i].className = "";
		
	// 	if(answers[i].innerHTML === definition) {
	// 		answers[i].classList.add("correct-answer");
	// 	} else if(answers[i].innerHTML !== definition && answers[i].innerHTML === answer) {
	// 		answers[i].classList.add("incorrect-answer");
	// 	}
	// }

	for(var i = 0; i < answers.length; i++) {
		answers[i].className = "";
		
		if(answers[i].textContent == answer) {
			answers[i].classList.add("answer");
		}
	}

	window.resize();
}