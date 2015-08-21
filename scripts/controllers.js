'use strict';

var drumControllers = angular.module('drumControllers', []);

drumControllers.controller('HomeController', function ($scope, Song, $localstorage, SongUtils) {
  //try loading songs from local storage, make last song default, otherwise create default song
  //when saving song,
  
  $scope.songList = SongUtils.getSongList();
  
  $scope.currentSong = $scope.songList[0]
  
  $scope.createNewSong = function() {
    var createdSong = new Song($scope.songname);
    $scope.songname = '';
    $scope.songList.unshift(createdSong);
    $localstorage.setObject('songList', $scope.songList);
    $scope.currentSong = $scope.songList[0]
  };

});