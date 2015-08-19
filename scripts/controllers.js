'use strict';

var drumControllers = angular.module('drumControllers', []);

drumControllers.controller('HomeController', function ($scope, Song) {
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
                  ]

  function Song(name) {
    this.name = name;
    this.drums = {}
  }

  function addDrumlistToSong(song, drumlist) {
    song.drums = []
    angular.forEach(drumlist, function(drum) {
      song.drums.push({
                        title: drum[0],
                        link: 'sounds/' + drum[1],
                        beatsArray: []
                      });
    });
  }

  var testSong = new Song('testsong')

  console.log(testSong.name);

  addDrumlistToSong(testSong, drumlist);
  console.log(testSong.drums);

});