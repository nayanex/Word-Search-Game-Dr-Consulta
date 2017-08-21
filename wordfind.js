(function () {

  	'use strict';

	const PUZZLE_HEIGHT = 10;
	const PUZZLE_WIDTH = 10

	var words = 'cows tracks arrived sir seat effect view annual ' +
				'millennium artisan apprentice speed count';

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

	var minWord = wordList[wordList.length -1];
	var letters = 'abcdefghijklmnopqrstuvwuxyz';

	var availableRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	var availableColumns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

	var fillPuzzle = function (wordList) {
		var puzzle = [], i, j, len;
		console.log(wordList);

	  	for (i = 0; i < PUZZLE_HEIGHT; i++) {
	    	puzzle.push([]);
	    	for (j = 0; j < PUZZLE_WIDTH; j++) {
	      		puzzle[i].push(' ');
	    	}
	  	}

	  	for (i = 0, len = wordList.length; i < len; i++) {
	  		placeWordInPuzzle(puzzle, wordList[i]);
	  		console.log("------------------------");
			console.log(puzzle);
	  	}
	  	return puzzle;
	};

	var placeWordInPuzzle = function (puzzle, word) {

		var placementRange = availableRows.length + availableColumns.length;

		// returns a number from 0 to 19
		var tempPosition = Math.floor(Math.random() * placementRange)
		
		if (tempPosition >= availableRows.length) {
			var columnIndex = availableColumns[tempPosition - availableRows.length]
			fillVertically(puzzle, columnIndex, word);
			
		}
		else {
			var rowIndex = availableRows[tempPosition];
			fillHorizontally(puzzle, rowIndex, word);
		}
	};

	var fillVertically = function (puzzle, columnIndex, word) {
		var wordLen = word.length;
		var rowIndex = Math.floor(Math.random() * (10 - wordLen + 1));

		console.log("--------");
		console.log("word: " + word + " (" + wordLen + ")");
		console.log("position: " + rowIndex + "," + columnIndex);
		
		if(wordFitsInColumn(puzzle, rowIndex, columnIndex, word)) {
			console.log("Fill VERTical");
			
			for (var i = 0; i < wordLen; i++, rowIndex++) {
				puzzle[rowIndex][columnIndex] = word[i];
				
			}
			scanAvailableColumns(puzzle, rowIndex, columnIndex, minWord);
			//scanAvailableRows(puzzle, columnIndex, minWord);
		}
		else {
			console.log("OOOPs VERTical!");
			placeWordInPuzzle(puzzle,word);
		}
	};

	var fillHorizontally = function (puzzle, rowIndex, word) {
		var wordLen = word.length;
		var columnIndex = Math.floor(Math.random() * (10 - wordLen + 1));

		console.log("--------");
		console.log("word: " + word + " (" + wordLen + ")");
		console.log("position: " + rowIndex + "," + columnIndex);

		if (wordFitsInRow(puzzle, rowIndex, columnIndex, word)) {
			console.log("Fill HORIZONTAL");
			
			for (var i = 0; i < wordLen; i++, columnIndex++) {
				puzzle[rowIndex][columnIndex] = word[i];
			}
			scanAvailableRows(puzzle, rowIndex, columnIndex, minWord);
		}
		else {
			console.log("OOPS HORIZONTAL!");
			placeWordInPuzzle(puzzle,word);
		}
	};

	var wordFitsInColumn = function (puzzle, rowIndex, columnIndex, word) {
		var wordLen = word.length;
		
		for (var i = rowIndex; i < rowIndex + wordLen; i++) {
			console.log(puzzle[i][columnIndex] + '==' + word[i - rowIndex] + " ?");
			if (puzzle[i][columnIndex] == ' ') {
				continue;
			} else if (puzzle[i][columnIndex] != word[i - rowIndex]) {
				return false;
			}
			else {
				return false;
			}
		}
		return true;
	};

	var wordFitsInRow = function (puzzle, rowIndex, columnIndex, word) {
		var wordLen = word.length;
		
		for (var i = columnIndex; i < columnIndex + wordLen; i++) {
			console.log(puzzle[rowIndex][i] + '==' + word[i - columnIndex] + " ?");
			if (puzzle[rowIndex][i] == ' ') {
				continue;
			} else if (puzzle[rowIndex][i] != word[i - columnIndex]) {
				console.log("FALSE!!");
				return false;
			}
			else {
				return false;
			}
		}
		return true;
	};

	var scanAvailableColumns = function (puzzle, rowIndex, columnIndex, minWord) {
		var minWordLength = minWord.length;
		var numberOfAdjacentAvailableCells = findnumberOfAdjacentAvailableCellsInColumn(puzzle, rowIndex, columnIndex, minWord);
		if (numberOfAdjacentAvailableCells < minWordLength) {
			availableColumns.splice(availableColumns.indexOf(columnIndex), 1);
		}
	};

	var scanAvailableRows = function (puzzle, rowIndex, columnIndex, minWord) {
		var minWordLength = minWord.length;
		var numberOfAdjacentAvailableCells = findnumberOfAdjacentAvailableCellsInRow(puzzle, rowIndex, columnIndex, minWord);
		if (numberOfAdjacentAvailableCells < minWordLength) {
			availableRows.splice(availableRows.indexOf(rowIndex), 1);
		}
	};
	

	var findnumberOfAdjacentAvailableCellsInColumn = function (puzzle, rowIndex, columnIndex, word) {
		var adjacentAvailableCells = [0, 0];
		var wordIndex = 0;
		var wordLen = word.length;

		for (var i = 0; i < PUZZLE_HEIGHT; i++) {
			//console.log((puzzle[i][columnIndex] + " == " + word[wordIndex] + "?"));
			if (puzzle[i][columnIndex] == ' ' ) {
				adjacentAvailableCells[0]++;
			}
			else if (adjacentAvailableCells[1] < adjacentAvailableCells[0]) {
				adjacentAvailableCells[1] = adjacentAvailableCells[0];
				adjacentAvailableCells[0] = 0;
				wordIndex = 0;
			}
			else {
				adjacentAvailableCells[0] = 0;
				wordIndex++;
			}
		}
		console.log("adjacent Free Cells in column: " + columnIndex + " is " + adjacentAvailableCells);

		return Math.max.apply(null, adjacentAvailableCells);
	};

	var findnumberOfAdjacentAvailableCellsInRow = function (puzzle, rowIndex, columnIndex, word) {
		var adjacentAvailableCells = [0, 0];
		var wordIndex = 0;
		var wordLen = word.length;

		for (var i = 0; i < PUZZLE_WIDTH; i++) {
			if (puzzle[rowIndex][i] == ' ') {
				adjacentAvailableCells[0]++;
			}
			else if (adjacentAvailableCells[1] < adjacentAvailableCells[0]) {
				adjacentAvailableCells[1] = adjacentAvailableCells[0];
				adjacentAvailableCells[0] = 0;
				wordIndex = 0;
			}
			else {
				adjacentAvailableCells[0] = 0;
				wordIndex++;
			}
		}
		console.log("adjacent Free Cells in row: " + rowIndex + " is " + adjacentAvailableCells);
		return Math.max.apply(null, adjacentAvailableCells);
	};

	fillPuzzle(wordList);
	console.log("Now the available Columns are:");
	console.log(availableColumns);
	console.log("Now the available Rows are:");
	console.log(availableRows);
	
	
	//positioningPosition

}).call(this);


























