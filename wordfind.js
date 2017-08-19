(function () {

  	'use strict';

	const PUZZLE_HEIGHT = 10;
	const PUZZLE_WIDTH = 10

	var words = 'cows tracks arrived located sir seat division effect underline view annual anniversary centennial ' +
				'millennium perennial artisan apprentice meteorologist blizzard tornado intensify speed count';

	// get rid of words with more than 10 characters
	var wordList = words.split(/[ ]+/).filter(function (str) {
    	var word = str.match(/(\w+)/);
    	return word && word[0].length <= 10;
	});

	// copy and sort the words by length, inserting words into the puzzle
	// from longest to shortest works out the best
	var wordList = wordList.sort( function (a,b) {
		return b.length - a.length;
	});

	var minWordLength = wordList[wordList.length -1].length;
	var letters = 'abcdefghijklmnopqrstuvwuxyz';

	var availableRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	var availableColumns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

	var fillPuzzle = function  (wordList) {
		var puzzle = [], i, j, len;

	  	for (i = 0; i < PUZZLE_HEIGHT; i++) {
	    	puzzle.push([]);
	    	for (j = 0; j < PUZZLE_WIDTH; j++) {
	      		puzzle[i].push(' ');
	    	}
	  	}

	  	for (i = 0, len = wordList.length; i < len; i++) {
	  		placeWordInPuzzle(puzzle, wordList[i]);
	  	}
	  	return puzzle;
	};

	var placeWordInPuzzle = function  (puzzle, word) {

		var placementRange = availableRows.length + availableColumns.length;

		// returns a number from 0 to 19
		var tempPosition = Math.floor(Math.random() * placementRange)
		
		

		if (tempPosition >= availableRows.length) {
			var columnIndex = availableColumns[tempPosition - availableRows.length]
			fillVertically(columnIndex, puzzle, word);
		}
		else {
			var rowIndex = availableRows[tempPosition];
			//fillHorizontally(rowIndex, puzzle, word);
		}
	};

	var fillVertically = function (columnIndex, puzzle, word) {
		var wordLen = word.length;
		var rowIndex = Math.floor(Math.random() * (10 - wordLen + 1));

		console.log("--------");
		console.log("word lenngth:");
		console.log(word.length);
		console.log(word);
		console.log("row index:");
		console.log(rowIndex);
		console.log("column index:");
		console.log(columnIndex);

		if(checkColumnAvailability(columnIndex, wordLen, puzzle)) {
			for (var i = 0; i < wordLen; i++, rowIndex++) {
				puzzle[rowIndex][columnIndex] = word[i];
			}
		}
		else {
			console.log("OOOPs!");
			placeWordInPuzzle(puzzle,word);
		}
		
	};

	var fillHorizontally = function (rowIndex,puzzle, word) {
		var wordLen = word.length;
		var columnIndex = Math.floor(Math.random() * (10 - wordLen + 1));

		if (checkRowAvailability(columnIndex, wordLen, puzzle)){
			for (var i = 0; i < len; i++, columnIndex++) {
				puzzle[rowIndex][columnIndex] = word[i];
			}
		}
		else {
			placeWordInPuzzle(puzzle,word);
		}
	};

	var checkColumnAvailability = function (position, wordLen, puzzle) {
		var numberOfAdjacentFreeCells = findNumberOfAdjacentFreeCellsInColumn(position, wordLen, puzzle);
		if (numberOfAdjacentFreeCells < minWordLength) {
			availableColumns.splice(availableColumns.indexOf(position), 1);
			return false;
		}
		if (numberOfAdjacentFreeCells < wordLen) {
			return false;
		}
		return true;
	};

	var checkRowAvailability = function (position, minWordLength) {
		
		
	};

	var findNumberOfAdjacentFreeCellsInColumn = function (position, wordLen, puzzle) {
		var adjacentFreeCells = 0;

		for (var i = 0; i < 10; i++) {
			if (adjacentFreeCells >= wordLen) {
				break;
			}
			else if (puzzle[i][position] == ' ') {
				adjacentFreeCells++;
			}
			else{
				adjacentFreeCells = 0;
			}
		}
		console.log("adjacent Free Cells in column: " + position + " is " + adjacentFreeCells);

		return adjacentFreeCells;
	};

	var findNumberOfAdjacentFreeCellsInRow = function (position, minWordLength, puzzle) {
		
	};

	console.log(fillPuzzle(wordList));
	console.log("Now the available Columns are:");
		console.log(availableColumns);
	
	
	//positioningPosition

}).call(this);


























