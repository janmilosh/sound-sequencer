'use strict';

var drumControllers = angular.module('drumControllers', []);

drumControllers.controller('HomeController', function ($scope, Song) {

  var testSong = new Song('testSong');

  console.log(testSong.name);
  console.log(testSong.drums);



});