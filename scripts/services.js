'use strict';

var drumServices = angular.module('drumServices', []);

drumServices.factory('Song', function(){  
  var drumlist = [
                    ['Clap', 'clap.mp3'],
                    ['Clave', 'clave.mp3'],
                    ['Cow Bell', 'cow-bell.mp3'],
                    ['Crash', 'crash-1.mp3'],
                    ['Hi Hat', 'hi-hat-1.mp3'],
                    ['Kick Drum', 'kick-drum-1.mp3'],
                    ['Maracas', 'maracas.mp3'],
                    ['Rim Shot', 'rim-shot.mp3'],
                    ['Snare Drum', 'snare-drum-1.mp3']
                  ];

  var populateDrumlist = function(drumArray) {
    angular.forEach(drumlist, function(drum) {
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