'use strict';

var soundServices = angular.module('soundServices', []);

soundServices.factory('$localstorage', ['$window', function($window) {
  //based on: http://learn.ionicframework.com/formulas/localstorage/
  return {
    set: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    get: function(key) {
      var value = $window.localStorage[key];
      if (value) {
        return JSON.parse(value);
      } else {
        return false;
      }
    }
  };
}]);

soundServices.factory('Unique', function() {
  return {
    isUniqueSongname: function(songName, songList) {
      var unique = true;
      angular.forEach(songList, function(song) {
        if (songName === song.name) {
          unique =  false;
        }
      });
      return unique;  
    }
  };
});

soundServices.service('SongUtils', function(Song, $localstorage) {
  var service = this;
  service.getSongList = function() {
    return $localstorage.get('sm-808-songList');
  };
  service.getCurrentSong = function() {
    return $localstorage.get('sm-808-currentSong')
  };
  service.setRangeArray = function(steps) {
    var range = [];
    for(var i = 1; i < steps + 1; i++) {
      range.push(i);
    }
    return range;
  };
  service.isUniqueSongname = function(songName, songList) {
    var unique = true;
    angular.forEach(songList, function(song) {
      if (songName === song.name) {
        unique =  false;
      }
    });
    return unique;
  };
  service.addFourOnTheFloorSequence = function(currentSong) {
    currentSong.sounds[4].stepsArray[2] = 'on';
    currentSong.sounds[4].stepsArray[6] = 'on';
    currentSong.sounds[4].stepsArray[10] = 'on';
    currentSong.sounds[4].stepsArray[14] = 'on';
    currentSong.sounds[5].stepsArray[0] = 'on';
    currentSong.sounds[5].stepsArray[4] = 'on';
    currentSong.sounds[5].stepsArray[8] = 'on';
    currentSong.sounds[5].stepsArray[12] = 'on';
    currentSong.sounds[8].stepsArray[4] = 'on';
    currentSong.sounds[8].stepsArray[12] = 'on';
  };
});

soundServices.factory('Song', function(SOUNDS){  
  var setEmptyStepsArray = function(steps) {
    var stepsArray = [];
    for(var i = 0; i < 24; i++) {
      stepsArray.push('off');
    }
    return stepsArray;
  };

  var populateSoundList = function(soundArray, steps, soundSetIndex) {
    angular.forEach(SOUNDS[soundSetIndex].files, function(sound) {
      
      soundArray.push({
                  title: sound[0],
                  link: ['sounds/' + sound[1], 'sounds/' + sound[2]],
                  stepsArray: setEmptyStepsArray(steps)
                });
    });
  };

  var Song = function(name, steps, bpm, soundSetIndex) {
    this.name = name;
    this.sounds = [];
    this.steps = steps;
    this.bpm = bpm;
    this.soundSetName = SOUNDS[soundSetIndex].name;
    populateSoundList(this.sounds, this.steps, soundSetIndex);
  };

  return Song;
});