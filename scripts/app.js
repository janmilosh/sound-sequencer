'use strict';

var drumApp = angular.module('drumApp', [
  'drumServices',
  'drumControllers',
  'ngRoute'
]);

drumApp.config(function ($routeProvider, $locationProvider) {  
  $routeProvider
    .when('/', {
      templateUrl: 'partials/home.html'
    })
    .otherwise({
      redirectTo: '/'
    });
});

//test out audo tag and methods
var audio = document.getElementById("drum1");
audio.preload = "auto";

var button = document.getElementById("button");
function playDrum(elem) { 
    document.getElementById(elem).load();
    document.getElementById(elem).play();
}