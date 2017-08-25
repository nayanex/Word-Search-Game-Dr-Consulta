var app = angular.module('wordSearchGameApp', []);

app.controller('puzzleController', ['$scope', 'createGameService', function($scope, createGameService) {
  var wordList;
  $scope.text = '';
  $scope.puzzle=[];

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
    $scope.puzzle = createGameService.fillPuzzle(wordList);
    console.log($scope.puzzle);
  };
}]);

