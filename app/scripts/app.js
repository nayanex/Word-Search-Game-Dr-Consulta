var app = angular.module('wordSearchGameApp', []);

app.controller('puzzleController', ['$scope', 'wordSearchPuzzle', function($scope, wordSearchPuzzle) {
  var wordList;
  var selectFrom;
  $scope.text = '';
  $scope.puzzle= [];
  $scope.selected = [];

  $scope.submit = function() {
    if($scope.text) {
      // get rid of words with more than 10 characters and less than 2 characters
      wordList = $scope.text.split(/[ ]+/).filter(function(str) {
        var word = str.match(/(\w+)/);
        return word && word[0].length <= 10 && word[0].length >= 2;
      });

      $scope.text = '';

      // copy and sort the words by length, inserting words into the puzzle
      // from longest to shortest works out the best
      wordList = wordList.sort( function (a,b) {
        return b.length - a.length;
      });
    }
    $scope.puzzle = wordSearchPuzzle(wordList);
  };

  $scope.selectStart = function (item) {
    selectFrom = item;
  };

  $scope.selectEnter = function (item) {
    if(selectFrom) {
      $scope.selected = $scope.puzzle.getItems(selectFrom.row, selectFrom.col, item.row, item.col);
    }
  };

  $scope.selectEnd = function () {
    selectFrom = null;
    $scope.puzzle.lookup($scope.selected);
    $scope.selected = [];
    console.log("STATE OF PUZZLE NOW");
    console.log($scope.puzzle);
  };

  $scope.$watch('selected', function(newItems, oldItems) {
    angular.forEach(oldItems, function(item) {
      item.selected = false;
    });
    angular.forEach(newItems, function(item) {
      item.selected = true;
    });
  });
}]);

