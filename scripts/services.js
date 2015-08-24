'use strict';

var drumServices = angular.module('drumServices', []);

drumServices.constant('DRUMLIST', [
  ['Clap', 'clap.mp3'],
  ['Clave', 'clave.mp3'],
  ['Cow Bell', 'cow-bell.mp3'],
  ['Crash', 'crash-1.mp3'],
  ['Hi Hat', 'hi-hat-1.mp3'],
  ['Kick Drum', 'kick-drum-1.mp3'],
  ['Maracas', 'maracas.mp3'],
  ['Rim Shot', 'rim-shot.mp3'],
  ['Snare Drum', 'snare-drum-1.mp3']
]);

drumServices.factory('$localstorage', ['$window', function($window) {
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

drumServices.factory('Unique', function() {
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

drumServices.service('SongUtils', function(Song, $localstorage) {
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
    currentSong.drums[4].stepsArray[2] = 'on';
    currentSong.drums[4].stepsArray[6] = 'on';
    currentSong.drums[4].stepsArray[10] = 'on';
    currentSong.drums[4].stepsArray[14] = 'on';
    currentSong.drums[5].stepsArray[0] = 'on';
    currentSong.drums[5].stepsArray[4] = 'on';
    currentSong.drums[5].stepsArray[8] = 'on';
    currentSong.drums[5].stepsArray[12] = 'on';
    currentSong.drums[8].stepsArray[4] = 'on';
    currentSong.drums[8].stepsArray[12] = 'on';
  };
});

drumServices.factory('Song', function(DRUMLIST){  
  var setEmptyStepsArray = function(steps) {
    var stepsArray = [];
    for(var i = 0; i < steps; i++) {
      stepsArray.push('off');
    }
    return stepsArray;
  };

  var populateDrumlist = function(drumArray, steps) {
    angular.forEach(DRUMLIST, function(drum) {
      
      drumArray.push({
                  title: drum[0],
                  link: 'sounds/' + drum[1],
                  stepsArray: setEmptyStepsArray(steps)
                });
    });
  };

  var Song = function(name, steps) {
    this.name = name;
    this.drums = []
    this.steps = steps
    populateDrumlist(this.drums, this.steps);
  };

  return Song;
});