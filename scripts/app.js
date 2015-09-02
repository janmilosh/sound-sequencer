'use strict';

var drumApp = angular.module('drumApp', [
  'soundServices',
  'soundConstants',
  'soundControllers',
  'soundDirectives',
  'soundFilters',
  'ui.slider',
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
