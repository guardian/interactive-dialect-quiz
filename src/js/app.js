import xr from 'xr'
import {shuffleArray, newQuestion, initPlayButtons} from './helpers'

xr.get('https://interactive.guim.co.uk/docsdata-test/1fLINBSrGJHbWAvwFVZ66UuJ3jbAiLHxqP-uU2Oz3xPk.json', {}).then(setup);

function setup(data) {
	var questions = data.data.sheets.subset.map((word) => {
		let splits = word.url.split("/");
        let code = splits[splits.length - 1].replaceAt(3, "A").replaceAt(22,"A");

        word.mp3 = "https://sounds.bl.uk/mp3/EEWB/" + code + ".mp3";
        return word;
	});

	newQuestion(questions);

	initPlayButtons();
}

String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}