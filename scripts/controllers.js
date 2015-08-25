'use strict';

var drumControllers = angular.module('drumControllers', []);

drumControllers.controller('HomeController', function ($scope, Song, $localstorage, SongUtils, Unique, STEPS_OPTIONS) {
  
  $scope.songList = SongUtils.getSongList();
  $scope.currentSong = SongUtils.getCurrentSong();
  
  $scope.options = STEPS_OPTIONS;
  $scope.selectedOption = $scope.options[8].value;

  $scope.isCurrent = function(index) {
    return $scope.currentSong.name === $scope.songList[index].name;
  };

  $scope.createNewSong = function() {
    var steps = 16;
    var bpm = 108;
    var createdSong = new Song($scope.songname, steps, bpm);
    $scope.songname = '';
    $scope.songList.unshift(createdSong);
    $localstorage.set('sm-808-songList', $scope.songList);
    $scope.currentSong = $scope.songList[0];
    $localstorage.set('sm-808-currentSong', $scope.currentSong);
    $scope.range = SongUtils.setRangeArray(steps);
    console.log($scope.currentSong)
  };

  $scope.deleteSong = function(index) {
    var deletedSong = $scope.songList[index];
    $scope.songList.splice(index, 1);
    if (deletedSong.name == $scope.currentSong.name) {
      $scope.currentSong = $scope.songList[0];
      $localstorage.set('sm-808-currentSong', $scope.currentSong);
    }
    $localstorage.set('sm-808-songList', $scope.songList);
    $scope.range = SongUtils.setRangeArray($scope.currentSong.steps);
  };
  
  $scope.selectSong = function(index) {
    $scope.currentSong = $scope.songList[index];
    $scope.range = SongUtils.setRangeArray($scope.currentSong.steps);
    $localstorage.set('sm-808-currentSong', $scope.currentSong);
  };

  if (!$scope.songList) {
    $scope.songList = [];
  }  

  if (!$scope.currentSong) {
    $scope.songname = 'Four on the Floor';
    $scope.createNewSong();
    SongUtils.addFourOnTheFloorSequence($scope.currentSong);
    $localstorage.set('sm-808-songList', $scope.songList);
    $localstorage.set('sm-808-currentSong', $scope.currentSong);
  }

  $scope.toggleState = function(drumIndex, index) {
    console.log(drumIndex, index)
    if ($scope.currentSong.drums[drumIndex].stepsArray[index] === 'on') {
      $scope.currentSong.drums[drumIndex].stepsArray[index] = 'off';
    } else {
      $scope.currentSong.drums[drumIndex].stepsArray[index] = 'on';
    }
    $localstorage.set('sm-808-songList', $scope.songList);
    $localstorage.set('sm-808-currentSong', $scope.currentSong);
  }

  $scope.range = SongUtils.setRangeArray($scope.currentSong.steps);

});