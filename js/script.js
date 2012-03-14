document.title = 'Prototype for integrating demographics';

this.Demonix = this.Demonix || function () {
	var colors = ['red','orange','yellow','green','blue','violet'];
	var answer = {};
	var guesses = {};
	var round = 1, choice = 1;
	var result = {black: 0, white: 0};
	var solved = false;

	var getRandomInt = function (min, max) {  
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	
	var chooseAnswer = function () {
		var available = [1, 2, 3, 4, 5, 6], chosen=0;
		for (var i = 4; i; i--) {
			chosen = getRandomInt(1, available.length);
			answer[colors[available[chosen-1]-1]] = i;
			Array.remove(available, chosen-1, chosen-1);
		}
	};
	
	var evaluate = function (event) {
		event.preventDefault();
		clearHint();
		
		if (solved) {
			clearHint();
			jQuery('#hints').append('<div id="hint"><p>You won! <a href="javascript:window.location.reload()">Play again?</a></p></div>');
			return;
		}
		if (6<round) {
			clearHint();
			jQuery('#hints').append('<div id="hint"><p>Aww. You used up your six guesses. <a href="javascript:window.location.reload()">Play again?</a></p></div>');
			return;
		}
		if (choice<5) {
			clearHint();
			jQuery('#hints').append('<div id="hint"><p>You haven\'t chosen four colors yet! Finish your sequence and then hit "Check it!"</p></div>');
			return;
		}
		var response = '';
		for (var c in answer) {
			if (answer.hasOwnProperty(c)) {
				if (c in guesses && guesses.hasOwnProperty(c)) {
					if (guesses[c] == answer[c]) {
						result.black+=1;
					} else {
						result.white+=1;
					}
				}
			}
		}
		//jQuery('body').append('<p>Guess: '+printObject(guesses)+'<br>Answer: '+printObject(answer)+'<br>Result: '+printObject(result)+'</p>');
		displayResult();
		round+=1;
		clearRound();
	};
	
	var displayResult = function () {
		for (var i=result.black;i;i--) {
			jQuery('#result_'+round.toString()).find('ul').append('<li class="black"></li>');
		}
		for (var i=result.white;i;i--) {
			jQuery('#result_'+round.toString()).find('ul').append('<li class="white"></li>');
		}
		
		if (4 == result.black) {
			solved = true;
			jQuery('footer h1').remove();
			jQuery('footer').append('<h1>You solved it! <a href="javascript:window.location.reload()">Play again?</a></h1>');
		} else if (6<=round) {
			jQuery('footer h1').remove();
			jQuery('footer').append('<h1>Nice try. <a href="javascript:window.location.reload()">Play again?</a></h1>');
		}
	};
	
	var printObject = function (o) {
		var out = '';
		for (var p in o) {
			if (o.hasOwnProperty(p)) {
				out += p + ': ' + o[p] + '\n';
			}
		}
		return out;
	}

	var getAnswer = function () {
		return answer;
	};	
	
	var populateChoices = function () {
		for (var i=colors.length;i;i--) {
			jQuery("#color_choices").append('<li id="li_'+colors[i-1]+'"></li>').find('li:last-child').html(colors[i-1]);
		}
	};
	
	var populateEmptyGuesses = function () {
		for (var i = 6; i ; i--) {
			for (var j = 1; j<=4 ; j++) {
				jQuery('#guess_'+i.toString()).find('ol').append('<li class="empty">'+j+'</li>');
			}
		}
	};
	
	var userChoice = function (event) {
		event.preventDefault();
		if (solved) {
			clearHint();
			jQuery('#hints').append('<div id="hint"><p>You won! <a href="javascript:window.location.reload()">Play again?</a></p></div>');
		} 
		else if (6<round) {
			clearHint();
			jQuery('#hints').append('<div id="hint"><p>Aww. You used up your six guesses. <a href="javascript:window.location.reload()">Play again?</a></p></div>');
		}
		else if (4<choice) {
			clearHint();
			jQuery('#hints').append('<div id="hint"><p>You chose four already. If you want to change your guess, click "Redo Sequence" and select colors again.</p></div>');
		}
		else {
			var color = jQuery(this).attr('id').split('_')[1];
			if (color in guesses) {
				clearHint();
				jQuery('#hints').append('<div id="hint"><p>You already chose that color. Choose four different colors. If you want to change your guess, click "Redo Sequence" and select colors again.</p></div>');
			} else {
				clearHint();
				var c = choice-1;
				jQuery('#guess_'+round.toString()).find("ol li:eq("+c+")").attr('class', color);
				//jQuery('#guess_'+round.toString()).find("ol").append('<li class="'+color+'">'+choice+'</li>');
				guesses[color] = choice;
				choice+=1;
			}
		}
	};
	
	var clearRound = function (event) {
		if (event) event.preventDefault();
		choice = 1;
		jQuery('#guess_'+round.toString()).find('ol li').attr('class', 'empty');
		guesses = {};
		result.black = 0;
		result.white = 0;
		clearHint();
	};
	
	var clearHint = function () {
		jQuery('#hint').remove();
	};

	return {ChooseAnswer: chooseAnswer,
				GetAnswer: getAnswer,
				Evaluate: evaluate,
				PopulateChoices: populateChoices,
				PopulateEmptyGuesses: populateEmptyGuesses,
				UserChoice: userChoice,
				Clear: clearRound};
}();

// Array Remove - By John Resig (MIT Licensed)
Array.remove = function(array, from, to) {
  var rest = array.slice((to || from) + 1 || array.length);
  array.length = from < 0 ? array.length + from : from;
  return array.push.apply(array, rest);
};

this.Demonix.ChooseAnswer();
this.Demonix.PopulateChoices();
this.Demonix.PopulateEmptyGuesses();
jQuery('#color_choices li').click(this.Demonix.UserChoice);
jQuery('#reset_colors').click(this.Demonix.Clear);
jQuery('#submit_colors').click(this.Demonix.Evaluate);
jQuery('#new_game').click(window.location.reload);