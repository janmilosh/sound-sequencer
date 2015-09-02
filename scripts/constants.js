'use strict';

var soundConstants = angular.module('soundConstants', []);

soundConstants.constant('SOUNDS', [
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
    'name': 'Animals',
    'files':  [
                ['Canary', 'animals/canary.wav', 'animals/canaryb.wav'],
                ['Cougar', 'animals/cougar.wav', 'animals/cougarb.wav'],
                ['Cow', 'animals/cow.wav', 'animals/cowb.wav'],
                ['Crow', 'animals/crow.wav', 'animals/crowb.wav'],
                ['More Crow', 'animals/more-crow.wav', 'animals/more-crowb.wav'],
                ['Dog', 'animals/dog.wav', 'animals/dogb.wav'],
                ['Duck', 'animals/duck.wav', 'animals/duckb.wav'],
                ['Elephant', 'animals/elephant.wav', 'animals/elephantb.wav'],
                ['Horse', 'animals/horse.wav', 'animals/horseb.wav'],
                ['Parrot', 'animals/parrot.wav', 'animals/parrotb.wav'],
                ['Rooster', 'animals/rooster.wav', 'animals/roosterb.wav'],
                ['Sheep', 'animals/sheep.wav', 'animals/sheepb.wav']
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
  },
  { 
    'name': 'Gong and Stuff',
    'files':  [
                ['Church bell', 'gong-and-stuff/church-bell.wav', 'gong-and-stuff/church-bellb.wav'],
                ['Gong', 'gong-and-stuff/gong.wav', 'gong-and-stuff/gongb.wav'],
                ['Harp', 'gong-and-stuff/harp.wav', 'gong-and-stuff/harpb.wav'],
                ['More harp', 'gong-and-stuff/more-harp.wav', 'gong-and-stuff/more-harpb.wav'],
                ['Horn', 'gong-and-stuff/horn.wav', 'gong-and-stuff/hornb.wav'],
                ['Korean blocks', 'gong-and-stuff/korean-blocks.wav', 'gong-and-stuff/sneezeb.wav'],
                ['Tympani', 'gong-and-stuff/tympani.wav', 'gong-and-stuff/tympanib.wav']
              ]
  }

]);

soundConstants.constant('STEPS_OPTIONS', [
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