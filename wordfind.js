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

		if(checkColumnAvailability(columnIndex, word, puzzle)) {
			for (var i = 0; i < wordLen; i++, rowIndex++) {
				puzzle[rowIndex][columnIndex] = word[i];
			}
			scanAvailableColumns(columnIndex, wordLen, puzzle);
		}
		else {
			console.log("OOOPs!");
			placeWordInPuzzle(puzzle,word);
		}
		
	};

	var fillHorizontally = function (rowIndex, puzzle, word) {
		var wordLen = word.length;
		var columnIndex = Math.floor(Math.random() * (10 - wordLen + 1));

		if (checkRowAvailability(columnIndex, word, puzzle)) {
			for (var i = 0; i < wordLen; i++, columnIndex++) {
				puzzle[rowIndex][columnIndex] = word[i];
			}
			scanAvailableRows(rowIndex, wordLen, puzzle);
		}
		else {
			console.log("OOPS HORIZONTAL!");
			placeWordInPuzzle(puzzle,word);
		}
	};

	var checkColumnAvailability = function (position, word, puzzle) {
		var wordLen = word.length;
		var numberOfAvailableCells = findNumberOfAvailableCellsInColumn(position, word, puzzle);
		
		if (numberOfAvailableCells < wordLen) {
			return false;
		}
		return true;
	};

	var checkRowAvailability = function (position, word, puzzle) {
		var wordLen = word.length;
		var numberOfAvailableCells = findnumberOfAvailableCellsInRow(position, word, puzzle);
		
		if (numberOfAvailableCells < wordLen) {
			return false;
		}
		return true;
	};

	var scanAvailableColumns = function (position, wordLen, puzzle) {
		var numberOfAvailableCells = findNumberOfAvailableCellsInColumn(position, minWordLength, puzzle);
		if (numberOfAvailableCells < minWordLength) {
			availableColumns.splice(availableColumns.indexOf(position), 1);
		}
	};

	var scanAvailableRows = function (position, wordLen, puzzle) {
		var numberOfAvailableCells = findnumberOfAvailableCellsInRow(position, minWordLength, puzzle);
		if (numberOfAvailableCells < minWordLength) {
			availableRows.splice(availableRows.indexOf(position), 1);
		}
	};
	

	var findNumberOfAvailableCellsInColumn = function (position, word, puzzle) {
		var availableCells = [0,0];
		var wordLen = word.length;
		console.log("word is: " + word);

		for (var i = 0; i < PUZZLE_HEIGHT; i++) {
			if (puzzle[i][position] == ' ') {
				availableCells[0]++;
			}
			else if (availableCells[1] < availableCells[0]) {
				availableCells[1] = availableCells[0];
				availableCells[0] = 0;
			}
			else {
				availableCells[0] = 0;
			}
			//console.log(puzzle[i][position] + " == " + word[availableCells] + "?");
		}
		console.log("adjacent Free Cells in column: " + position + " is " + availableCells);

		return Math.max.apply(null, availableCells);
	};

	var findnumberOfAvailableCellsInRow = function (position, word, puzzle) {
		var availableCells = 0;
		var wordLen = word.length;

		for (var i = 0; i < PUZZLE_WIDTH; i++) {
			if (availableCells >= wordLen) {
				availableCells++;
			}
			else if (puzzle[position][i] == ' ' || puzzle[i][position] == word[availableCells]) {
				availableCells++;
			}
			else {
				availableCells = 0;
			}
		}
		console.log("adjacent Free Cells in column: " + position + " is " + availableCells + " i: " + i);

		return availableCells;
		
	};

	console.log(fillPuzzle(wordList));
	console.log("Now the available Columns are:");
	console.log(availableColumns);
	console.log("Now the available Rows are:");
	console.log(availableRows);
	
	
	//positioningPosition

}).call(this);


























