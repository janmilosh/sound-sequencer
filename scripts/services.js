'use strict';

var drumServices = angular.module('drumServices', []);

drumServices.constant('DRUMLIST', [
  ['Clap', 'clap.mp3', 'clapb.mp3'],
  ['Clave', 'clave.mp3', 'claveb.mp3'],
  ['Cow Bell', 'cow-bell.mp3', 'cow-bellb.mp3'],
  ['Crash', 'crash-1.mp3', 'crash-1b.mp3'],
  ['Hi Hat', 'hi-hat-1.mp3', 'hi-hat-1b.mp3'],
  ['Kick Drum', 'kick-drum-1.mp3', 'kick-drum-1b.mp3'],
  ['Maracas', 'maracas.mp3', 'maracasb.mp3'],
  ['Rim Shot', 'rim-shot.mp3', 'rim-shotb.mp3'],
  ['Snare Drum', 'snare-drum-1.mp3', 'snare-drum-1b.mp3']
]);

drumServices.constant('STEPS_OPTIONS', [
    {value: '8', name: '8'},
    {value: '9', name: '9'},
    {value: '10', name: '10'},
    {value: '11', name: '11'},
    {value: '12', name: '12'},
    {value: '13', name: '13'},
    {value: '14', name: '14'},
    {value: '15', name: '15'},
    {value: '16', name: '16'},
    {value: '17', name: '17'},
    {value: '18', name: '18'},
    {value: '19', name: '19'},
    {value: '20', name: '20'},
    {value: '21', name: '21'},
    {value: '22', name: '22'},
    {value: '23', name: '23'},
    {value: '24', name: '24'},
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
    for(var i = 0; i < 24; i++) {
      stepsArray.push('off');
    }
    return stepsArray;
  };

  var populateDrumlist = function(drumArray, steps) {
    angular.forEach(DRUMLIST, function(drum) {
      
      drumArray.push({
                  title: drum[0],
                  link: ['sounds/' + drum[1], 'sounds/' + drum[2]],
                  stepsArray: setEmptyStepsArray(steps)
                });
    });
  };

  var Song = function(name, steps, bpm) {
    this.name = name;
    this.drums = [];
    this.steps = steps;
    this.bpm = bpm;
    populateDrumlist(this.drums, this.steps);
  };

  return Song;
});