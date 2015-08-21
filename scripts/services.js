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
  //usage: http://learn.ionicframework.com/formulas/localstorage/
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '[]');
    }
  }
}]);

drumServices.service('SongUtils', function(Song, $localstorage) {
  var service = this;
  service.getSongList = function() {
    return $localstorage.getObject('songList');
  };
});

drumServices.factory('Song', function(DRUMLIST){  
  var populateDrumlist = function(drumArray) {
    angular.forEach(DRUMLIST, function(drum) {
      drumArray.push({
                  title: drum[0],
                  link: 'sounds/' + drum[1],
                  stepsArray: []
                });
    });
  };

  var Song = function(name) {
    this.name = name;
    this.drums = []
    populateDrumlist(this.drums);
  };

  return Song;
});