'use strict';

var drumDirectives = angular.module('drumDirectives', []);

drumDirectives.directive('unique', function (SongUtils) { 
  return {
    require: 'ngModel',
    link: function(scope, elem, attr, ngModel) {
        scope.$watch('songname',function(oldVal, newVal) {
        var isUnique = SongUtils.isUniqueSongname(oldVal, scope.songList);
        ngModel.$setValidity('unique', isUnique);
      });
    }
  };
});