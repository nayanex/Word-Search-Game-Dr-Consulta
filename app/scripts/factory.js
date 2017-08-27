angular.module('wordSearchGameApp')
  .factory('wordSearchPuzzle', [ function() {

	const BOARD_HEIGHT = 10;
  const BOARD_WIDTH = 10
  const LETTERS = 'abcdefghijklmnopqrstuvwxyz';

	var minword; 
  var availableRows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	var availableColumns = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	
	function WordSearchPuzzle (wordList) {

    this.solved = false;
    this.wordList = wordList;
    this.matrix = [];
    minWord = wordList[wordList.length -1];
    var i, j, len;

	  for (i = 0; i < BOARD_HEIGHT; i++) {
	    this.matrix.push([]);
	    for (j = 0; j < BOARD_WIDTH; j++) {
	    	this.matrix[i].push(' ');
	    }
	 	}

	  for (i = 0, len = wordList.length; i < len; i++) {
	   	this.matrix = placeWordInPuzzle(this.matrix, wordList[i]);
	  }
	  this.matrix = fillBlanks(this.matrix);
  };

  var fillBlanks = function (matrix) {
    for (var rowIndex = 0; rowIndex < BOARD_HEIGHT; rowIndex++) {
      for (var columnIndex = 0; columnIndex < BOARD_WIDTH; columnIndex++) {
        if (matrix[rowIndex][columnIndex] == ' ') {
          var randomLetter = Math.floor(Math.random() * LETTERS.length);
          var item = {
            letter: LETTERS[randomLetter],
            col: columnIndex,
            row: rowIndex
          };
          matrix[rowIndex][columnIndex] = item;
        }
      }
    }
    return matrix;
  };

  var getItem = function (matrix, row, col) {
    return (matrix[row] ? matrix[row][cow]:undefined);
  };

  var getItems = function (matrix, rowFrom, colFrom, rowTo, colTo) {
    var items = [];
    var maxRow = BOARD_WIDTH - 1;
    var maxCol = BOARD_HEIGHT - 1;

    if (rowTo > maxRow) {
      rowTo = maxRow;
    }
    if (colTo > maxCol) {
      colTo = maxCol;
    }

    if (getItem(colTo, rowTo) === undefined) {
      return items;
    }

    if (colFrom === colTo || rowFrom === rowTo) {
      var shiftX = (colFrom === colTo ? 0 : (colTo > colFrom ? 1 : -1)),
          shiftY = (rowFrom === rowTo ? 0 : (rowTo > rowFrom ? 1 : -1)),
          col = colFrom,
          row = rowFrom;

      items.push(getItem(matrix, row, col));

      do {
        col += shiftX;
        row += shiftY;
        items.push(getItem(matrix, row, col));
      } while (col !== colTo || row !== rowTo);
    }
    return items;
  };

  var placeWordInPuzzle = function (matrix, word) {
    var placementRange = availableRows.length + availableColumns.length;
   	// returns a number from 0 to 19
   	var tempPosition = Math.floor(Math.random() * placementRange)
   		
   	if (tempPosition >= availableRows.length) {
   		var columnIndex = availableColumns[tempPosition - availableRows.length]
   		matrix = fillVertically(matrix, columnIndex, word);
   	}
   	else {
   		var rowIndex = availableRows[tempPosition];
   		matrix = fillHorizontally(matrix, rowIndex, word);
   	}
    return matrix;
   };

  var fillVertically = function (matrix, columnIndex, word) {
  	var wordLen = word.length;
  	var rowIndex = Math.floor(Math.random() * (10 - wordLen + 1));

  	console.log("--------");
  	console.log("word: " + word + " (" + wordLen + ")");
  	console.log("position: " + rowIndex + "," + columnIndex);
		    		
  	if(wordFitsInColumn(matrix, rowIndex, columnIndex, word)) {
 			console.log("Fill VERTical");
 			for (var i = 0; i < wordLen; i++, rowIndex++) {
        var item = {
          letter: word[i],
          col: columnIndex,
          row: rowIndex
        };
 				matrix[rowIndex][columnIndex] = item;
 			}
 			scanAvailableColumns(matrix, rowIndex, columnIndex, minWord);
 			//scanAvailableRows(matrix, columnIndex, minWord);
 		}
 		else {
 			console.log("OOOPs VERTical!");
 			placeWordInPuzzle(matrix,word);
 		}
    return matrix;
 	};

  var fillHorizontally = function (matrix, rowIndex, word) {
   	var wordLen = word.length;
   	var columnIndex = Math.floor(Math.random() * (10 - wordLen + 1));

   	console.log("--------");
   	console.log("word: " + word + " (" + wordLen + ")");
   	console.log("position: " + rowIndex + "," + columnIndex);

   	if (wordFitsInRow(matrix, rowIndex, columnIndex, word)) {
   		console.log("Fill HORIZONTAL");
   		for (var i = 0; i < wordLen; i++, columnIndex++) {
        var item = {
          letter: word[i],
          col: columnIndex,
          row: rowIndex
        };
   			matrix[rowIndex][columnIndex] = item;
   		}
   		scanAvailableRows(matrix, rowIndex, columnIndex, minWord);
   	}
   	else {
   		console.log("OOPS HORIZONTAL!");
   		placeWordInPuzzle(matrix,word);
   	}
    return matrix;
  };

  var wordFitsInColumn = function (matrix, rowIndex, columnIndex, word) {
		var wordLen = word.length;
	    		
  	for (var i = rowIndex; i < rowIndex + wordLen; i++) {
   	  //console.log(puzzle[i][columnIndex] + '==' + word[i - rowIndex] + " ?");
			if (matrix[i][columnIndex] == ' ') {
   			continue;
   		} else if (matrix[i][columnIndex] != word[i - rowIndex]) {
   			return false;
   		}
   		else {
   			return false;
   		}
   	}
   	return true;
  };

  var wordFitsInRow = function (matrix, rowIndex, columnIndex, word) {
  	var wordLen = word.length;
   	for (var i = columnIndex; i < columnIndex + wordLen; i++) {
   		//console.log(puzzle[rowIndex][i] + '==' + word[i - columnIndex] + " ?");
   		if (matrix[rowIndex][i] == ' ') {
   			continue;
   		} else if (matrix[rowIndex][i] != word[i - columnIndex]) {
   			//console.log("FALSE!!");
   			return false;
   		}
   		else {
   			return false;
   		}
   	}
   	return true;
  };

  var scanAvailableColumns = function (matrix, rowIndex, columnIndex, minWord) {
   	var minWordLength = minWord.length;
   	var numberOfAdjacentAvailableCells = findnumberOfAdjacentAvailableCellsInColumn(matrix, rowIndex, columnIndex, minWord);
   	if (numberOfAdjacentAvailableCells < minWordLength) {
   		availableColumns.splice(availableColumns.indexOf(columnIndex), 1);
   	}
  };

  var scanAvailableRows = function (matrix, rowIndex, columnIndex, minWord) {
   	var minWordLength = minWord.length;
   	var numberOfAdjacentAvailableCells = findnumberOfAdjacentAvailableCellsInRow(matrix, rowIndex, columnIndex, minWord);
   	if (numberOfAdjacentAvailableCells < minWordLength) {
   		availableRows.splice(availableRows.indexOf(rowIndex), 1);
   	}
  };

  var findnumberOfAdjacentAvailableCellsInColumn = function (matrix, rowIndex, columnIndex, word) {
   	var adjacentAvailableCells = [0, 0];
   	var wordIndex = 0;
   	var wordLen = word.length;

   	for (var i = 0; i < BOARD_HEIGHT; i++) {
   		//console.log((matrix[i][columnIndex] + " == " + word[wordIndex] + "?"));
   		if (matrix[i][columnIndex] == ' ' ) {
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

  var findnumberOfAdjacentAvailableCellsInRow = function (matrix, rowIndex, columnIndex, word) {
   	var adjacentAvailableCells = [0, 0];
   	var wordIndex = 0;
   	var wordLen = word.length;

   	for (var i = 0; i < BOARD_WIDTH; i++) {
  		if (matrix
        [rowIndex][i] == ' ') {
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

  return function(wordList) {
    return new WordSearchPuzzle(wordList);
  };
   
}]);