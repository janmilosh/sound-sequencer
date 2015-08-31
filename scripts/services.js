'use strict';

var soundServices = angular.module('soundServices', []);

soundServices.constant('SOUNDS', [
  {
    'name': 'Drums',
    'files':  [
                ['Clap', 'drum/clap.mp3', 'drum/clapb.mp3'],
                ['Clave', 'drum/clave.mp3', 'drum/claveb.mp3'],
                ['Cow Bell', 'drum/cow-bell.mp3', 'drum/cow-bellb.mp3'],
                ['More Cow Bell', 'drum/more-cow-bell.mp3', 'drum/more-cow-bellb.mp3'],
                ['Crash', 'drum/crash-1.mp3', 'drum/crash-1b.mp3'],
                ['Hi Hat', 'drum/hi-hat-1.mp3', 'drum/hi-hat-1b.mp3'],
                ['Kick Drum', 'drum/kick-drum-1.mp3', 'drum/kick-drum-1b.mp3'],
                ['Maracas', 'drum/maracas.mp3', 'drum/maracasb.mp3'],
                ['Rim Shot', 'drum/rim-shot.mp3', 'drum/rim-shotb.mp3'],
                ['Snare Drum', 'drum/snare-drum-1.mp3', 'drum/snare-drum-1b.mp3']
              ]
  },
  { 
    'name': 'Comics',
    'files':  [
                ['Bang', 'comic/bang.wav', 'comic/bangb.wav'],
                ['Click-whistle', 'comic/click-whistle.wav', 'comic/click-whistleb.wav'],
                ['Kiss', 'comic/kiss.wav', 'comic/kissb.wav'],
                ['Pop', 'comic/pop.wav', 'comic/popb.wav'],
                ['Sneeze', 'comic/sneeze.wav', 'comic/sneezeb.wav'],
                ['Horn blast', 'comic/horn-blast.wav', 'comic/horn-blastb.wav'],
                ['Laser', 'comic/laser.wav', 'comic/laserb.wav'],
                ['Alarm', 'comic/alarm.wav', 'comic/alarmb.wav']
              ]
  }
]);

soundServices.constant('STEPS_OPTIONS', [
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