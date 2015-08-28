'use strict';

var drumControllers = angular.module('drumControllers', []);

drumControllers.controller('HomeController', function ($rootScope, $scope, $localstorage, $interval, Song, SongUtils, Unique, STEPS_OPTIONS) {
  
  $scope.songList = SongUtils.getSongList();
  $scope.currentSong = SongUtils.getCurrentSong();

  $scope.options = STEPS_OPTIONS;

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
  };
  
  $scope.selectSong = function(index) {
    $scope.currentSong = $scope.songList[index];
    $scope.range = SongUtils.setRangeArray($scope.currentSong.steps);
    $scope.selectedStepsOption = $scope.currentSong.steps.toString();
    $localstorage.set('sm-808-currentSong', $scope.currentSong);
    $scope.audioCache = setupAudio($scope.currentSong);
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
  
  
  var drumLoop = function(playFirst, index) {
    angular.forEach($scope.currentSong.drums, function(drum) {
      if (drum.stepsArray[index] === 'on') {
        if (playFirst) {
          $scope.audioCache.first[drum.title].play();
          $scope.audioCache.second[drum.title].load();
        } else {
          $scope.audioCache.second[drum.title].play();
          $scope.audioCache.first[drum.title].load();
        }
      }        
    });
  }

  $scope.startSequence = function() {
    $scope.currentIndex = 0; 
    var playFirst = true;
    console.log($scope.currentIndex)
    drumLoop(playFirst, $scope.currentIndex);
    
    var start = $interval(function() {
      $scope.currentIndex += 1;
      playFirst = !playFirst;
      console.log($scope.currentIndex)
      drumLoop(playFirst, $scope.currentIndex);
                  
      if ($scope.currentIndex > $scope.currentSong.steps - 2) {
        $scope.currentIndex = -1;
      }

      $scope.stopSequence = function() {
        $interval.cancel(start);
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
  }

  $scope.selectedStepsOption = $scope.currentSong.steps.toString();
  $scope.range = SongUtils.setRangeArray($scope.currentSong.steps);
  $scope.stepInterval = Math.round(60000/parseInt($scope.currentSong.bpm, 10));
  $scope.audioCache = setupAudio($scope.currentSong);
  

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