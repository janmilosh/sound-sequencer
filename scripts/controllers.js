'use strict';

var soundControllers = angular.module('soundControllers', []);

soundControllers.controller('HomeController', function ($rootScope, $scope, $localstorage, $interval, $timeout, Song, SongUtils, Unique, STEPS_OPTIONS, SOUNDS) {
  
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
    saveToLocalStorage()
    $scope.range = SongUtils.setRangeArray($scope.currentSong.steps);
    $scope.audioCache = setupAudio();
  };

  $scope.deleteSong = function(index) {
    var deletedSong = $scope.songList[index];
    $scope.songList.splice(index, 1);
    if (deletedSong.name == $scope.currentSong.name) {
      $scope.currentSong = $scope.songList[0];
    }
    saveToLocalStorage()
    $scope.range = SongUtils.setRangeArray($scope.currentSong.steps);
    $scope.audioCache = setupAudio();
    setPlayedLast();
  };
  
  $scope.selectSong = function(index) {
    $scope.currentSong = $scope.songList[index];
    $scope.range = SongUtils.setRangeArray($scope.currentSong.steps);
    $scope.selectedStepsOption = $scope.currentSong.steps.toString();
    saveToLocalStorage()
    $scope.audioCache = setupAudio();
    setPlayedLast();
  };

  $scope.toggleState = function(soundIndex, index) {
    if ($scope.currentSong.sounds[soundIndex].stepsArray[index] === 'on') {
      $scope.currentSong.sounds[soundIndex].stepsArray[index] = 'off';
    } else {
      $scope.currentSong.sounds[soundIndex].stepsArray[index] = 'on';
    }
    saveToLocalStorage()
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
    $scope.songname = 'Four on the Floor';
    $scope.soundsIndex = '0';
    $scope.createNewSong();
    SongUtils.addFourOnTheFloorSequence($scope.currentSong);
    saveToLocalStorage()
  } else {
    $scope.audioCache = setupAudio();
  }

  $scope.selectedStepsOption = $scope.currentSong.steps.toString();
  $scope.range = SongUtils.setRangeArray($scope.currentSong.steps);
  $scope.stepInterval = Math.round(60000/parseInt($scope.currentSong.bpm, 10));
  $scope.audioCache = setupAudio();
  setPlayedLast();

  function saveToLocalStorage() {
    $localstorage.set('sm-808-songList', $scope.songList);
    $localstorage.set('sm-808-currentSong', $scope.currentSong); 
  };

  function setupAudio() {
    var audioCache = {};
    audioCache.first = {};
    audioCache.second = {};
    
    angular.forEach($scope.currentSong.sounds, function(sound) {
      audioCache.first[sound.title] = new Audio(sound.link[0]);
      audioCache.second[sound.title] = new Audio(sound.link[1]);
      audioCache.first[sound.title].load()
    });
    return audioCache;
  };
});