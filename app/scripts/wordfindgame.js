(function (document, $, wordfind) {
	
	'use strict';

	var WordFindGame = function () {

		// Here receive the words
		
		var create = function (words, puzzleEl, wordsEl) {
			var puzzle = wordfind.newPuzzle(words);

			drawPuzzle (puzzleEl, puzzle);
			drawWords (wordsEl, wordList);
/*
			if (window.navigator).msPointerEnabled {
				$(.'puzzleSquare').on('MSPointerDown', startTurn);
				$('.puzzleSquare').on('MSPointerOver', select);
				$('.puzzleSquare').on('MSPointerUp', endTurn);
			}
			else {
				$('.puzzleSquare').mousedown(startTurn);
				$('.puzzleSquare').mouseenter(mouseMove);
				$('.puzzleSquare').mouseup(endTurn);
				$('.puzzleSquare').on("touchstart", startTurn);
				$('.puzzleSquare').on("touchmove", touchMove);
				$('.puzzleSquare').on("touchend", endTurn);
			}
*/
			return puzzle;
		};

		var startTurn = function () {
			$(this).addClass('selected');
			startSquare = this;
			selectedSquares.push(this);
			curWord = $(this).text();
		};
	};

	window.wordfindgame = WordFindGame();

}(document, jQuery, wordfind));