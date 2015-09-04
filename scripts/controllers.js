'use strict';

var soundControllers = angular.module('soundControllers', []);

soundControllers.controller('HomeController', function ($rootScope, $scope, $interval, $timeout, Song, SongUtils, Unique, STEPS_OPTIONS, SOUNDS) {
  
  $scope.songList = SongUtils.getSongList();
  $scope.currentSong = SongUtils.getCurrentSong();
  $scope.soundOptions = SOUNDS;
  $scope.options = STEPS_OPTIONS;
  $scope.stopSequence = function() {};
  var playedLast = {}

  $scope.isCurrent = function(index) {
    return $scope.currentSong.name === $scope.songList[index].name;
  };

  $rootScope.$on('setStepInterval', function(event, data) {
    $scope.stepInterval = data;
  });

  $scope.createNewSong = function() {
    var steps = 16;
    var bpm = 200;
    var createdSong = new Song($scope.songname, steps, bpm, parseInt($scope.soundsIndex, 10));
    $scope.songname = '';
    $scope.soundsIndex = '';
    $scope.songList.unshift(createdSong);
    $scope.currentSong = $scope.songList[0];
    SongUtils.saveToLocalStorage($scope.songList, $scope.currentSong);
    $scope.range = SongUtils.setRangeArray($scope.currentSong.steps);
    $scope.audioCache = SongUtils.setupAudio($scope.currentSong);
  };

  $scope.deleteSong = function(index) {
    var deletedSong = $scope.songList[index];
    $scope.songList.splice(index, 1);
    if (deletedSong.name == $scope.currentSong.name) {
      $scope.currentSong = $scope.songList[0];
    }
    SongUtils.saveToLocalStorage($scope.songList, $scope.currentSong);
    $scope.range = SongUtils.setRangeArray($scope.currentSong.steps);
    $scope.audioCache = SongUtils.setupAudio($scope.currentSong);
    setPlayedLast();
  };
  
  $scope.selectSong = function(index) {
    $scope.currentSong = $scope.songList[index];
    $scope.range = SongUtils.setRangeArray($scope.currentSong.steps);
    $scope.selectedStepsOption = $scope.currentSong.steps.toString();
    SongUtils.saveToLocalStorage($scope.songList, $scope.currentSong);
    $scope.audioCache = SongUtils.setupAudio($scope.currentSong);
    setPlayedLast();
  };

  $scope.toggleState = function(soundIndex, index) {
    if ($scope.currentSong.sounds[soundIndex].stepsArray[index] === 'on') {
      $scope.currentSong.sounds[soundIndex].stepsArray[index] = 'off';
    } else {
      $scope.currentSong.sounds[soundIndex].stepsArray[index] = 'on';
    }
    SongUtils.saveToLocalStorage($scope.songList, $scope.currentSong);
  }
  
  function setPlayedLast() {
    angular.forEach($scope.currentSong.sounds, function(sound) {
      playedLast[sound.title] = false;
    });
  };

  function soundLoop(index) {
    angular.forEach($scope.currentSong.sounds, function(sound) {
      if (sound.stepsArray[index] === 'on') {
        if (playedLast[sound.title] === false) {
          $scope.audioCache.first[sound.title].play();
          $scope.audioCache.second[sound.title].load();
        } else {
          $scope.audioCache.second[sound.title].play();
          $scope.audioCache.first[sound.title].load();
        }
        playedLast[sound.title] = !playedLast[sound.title];
      }        
    });
  };
  
  $scope.startSequence = function() {
    var songIndex = 0;
    $scope.playing = true;
    
    var start = $interval(function() {
      soundLoop(songIndex);
      
      songIndex += 1;
                 
      if (songIndex === $scope.currentSong.steps) {
        songIndex = 0;
        $scope.currentIndex = $scope.currentSong.steps -1;
      } else {
        $scope.currentIndex = songIndex - 1;
      }
      
      $scope.stopSequence = function() {
        $interval.cancel(start);
        $scope.currentIndex = null;
        $scope.playing = false;
      };

    }, $scope.stepInterval);  
  };
  
  if (!$scope.songList) {
    $scope.songList = [];
  }  

  if (!$scope.currentSong) {
    createDefaultSong();
  } else {
    $scope.audioCache = SongUtils.setupAudio($scope.currentSong);
  }

  $scope.selectedStepsOption = $scope.currentSong.steps.toString();
  $scope.range = SongUtils.setRangeArray($scope.currentSong.steps);
  $scope.stepInterval = Math.round(60000/parseInt($scope.currentSong.bpm, 10));
  $scope.audioCache = SongUtils.setupAudio($scope.currentSong);
  setPlayedLast();

  function createDefaultSong() {
    $scope.songname = 'Four on the Floor';
    $scope.soundsIndex = '0';
    $scope.createNewSong();
    SongUtils.addFourOnTheFloorSequence($scope.currentSong);
    SongUtils.saveToLocalStorage($scope.songList, $scope.currentSong);
  };

});