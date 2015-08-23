'use strict';

var drumControllers = angular.module('drumControllers', []);

drumControllers.controller('HomeController', function ($scope, Song, $localstorage, SongUtils, Unique) {
  
  $scope.songList = SongUtils.getSongList();
  $scope.currentSong = SongUtils.getCurrentSong(); 

  $scope.isCurrent = function(index) {
    return $scope.currentSong.name === $scope.songList[index].name;
  };

  $scope.createNewSong = function() {
    var steps = 16;
    var createdSong = new Song($scope.songname, steps);
    $scope.songname = '';
    $scope.songList.unshift(createdSong);
    $localstorage.set('sm-808-songList', $scope.songList);
    $scope.currentSong = $scope.songList[0];
    $localstorage.set('sm-808-currentSong', $scope.currentSong);
    $scope.range = SongUtils.setRangeArray(steps);
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
  };

  if (!$scope.songList) {
    $scope.songList = [];
  }  

  if (!$scope.currentSong) {
    $scope.songname = 'Four on the Floor';
    $scope.createNewSong();
  }

  $scope.range = SongUtils.setRangeArray($scope.currentSong.steps);

});