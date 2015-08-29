'use strict';

var drumControllers = angular.module('drumControllers', []);

drumControllers.controller('HomeController', function ($rootScope, $scope, $localstorage, $interval, $timeout, Song, SongUtils, Unique, STEPS_OPTIONS) {
  
  $scope.songList = SongUtils.getSongList();
  $scope.currentSong = SongUtils.getCurrentSong();

  $scope.options = STEPS_OPTIONS;
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
    var createdSong = new Song($scope.songname, steps, bpm);
    $scope.songname = '';
    $scope.songList.unshift(createdSong);
    $scope.currentSong = $scope.songList[0];
    $localstorage.set('sm-808-songList', $scope.songList);
    $localstorage.set('sm-808-currentSong', $scope.currentSong);
    $scope.range = SongUtils.setRangeArray($scope.currentSong.steps);
  };

  $scope.deleteSong = function(index) {
    var deletedSong = $scope.songList[index];
    $scope.songList.splice(index, 1);
    if (deletedSong.name == $scope.currentSong.name) {
      $scope.currentSong = $scope.songList[0];
    }
    $localstorage.set('sm-808-currentSong', $scope.currentSong);
    $localstorage.set('sm-808-songList', $scope.songList);
    $scope.range = SongUtils.setRangeArray($scope.currentSong.steps);
    $scope.audioCache = setupAudio($scope.currentSong);
    setPlayedLast();
  };
  
  $scope.selectSong = function(index) {
    $scope.currentSong = $scope.songList[index];
    $scope.range = SongUtils.setRangeArray($scope.currentSong.steps);
    $scope.selectedStepsOption = $scope.currentSong.steps.toString();
    $localstorage.set('sm-808-currentSong', $scope.currentSong);
    $scope.audioCache = setupAudio($scope.currentSong);
    setPlayedLast();
  };

  $scope.toggleState = function(drumIndex, index) {
    if ($scope.currentSong.drums[drumIndex].stepsArray[index] === 'on') {
      $scope.currentSong.drums[drumIndex].stepsArray[index] = 'off';
    } else {
      $scope.currentSong.drums[drumIndex].stepsArray[index] = 'on';
    }
    $localstorage.set('sm-808-songList', $scope.songList);
    $localstorage.set('sm-808-currentSong', $scope.currentSong);
  }
  
  function setPlayedLast() {
    angular.forEach($scope.currentSong.drums, function(drum) {
      playedLast[drum.title] = false;
    });
  };

  function drumLoop(index) {
    angular.forEach($scope.currentSong.drums, function(drum) {
      if (drum.stepsArray[index] === 'on') {
        if (playedLast[drum.title] === false) {
          $scope.audioCache.first[drum.title].play();
          $scope.audioCache.second[drum.title].load();
        } else {
          $scope.audioCache.second[drum.title].play();
          $scope.audioCache.first[drum.title].load();
        }
        playedLast[drum.title] = !playedLast[drum.title];
      }        
    });
  };
  
  $scope.startSequence = function() {
    var songIndex = 0;
    $scope.playing = true;
    
    var start = $interval(function() {
      drumLoop(songIndex);
      
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
    $scope.createNewSong();
    SongUtils.addFourOnTheFloorSequence($scope.currentSong);
    $localstorage.set('sm-808-songList', $scope.songList);
    $localstorage.set('sm-808-currentSong', $scope.currentSong);
  } else {
    $scope.audioCache = setupAudio($scope.currentSong);
  }

  $scope.selectedStepsOption = $scope.currentSong.steps.toString();
  $scope.range = SongUtils.setRangeArray($scope.currentSong.steps);
  $scope.stepInterval = Math.round(60000/parseInt($scope.currentSong.bpm, 10));
  $scope.audioCache = setupAudio($scope.currentSong);
  setPlayedLast();
  

  function setupAudio(currentSong) {
    var audioCache = {};
    audioCache.first = {};
    audioCache.second = {};
    
    angular.forEach(currentSong.drums, function(drum) {
      audioCache.first[drum.title] = new Audio(drum.link[0]);
      audioCache.second[drum.title] = new Audio(drum.link[1]);
      audioCache.first[drum.title].load()
    });
    return audioCache;
  };
});