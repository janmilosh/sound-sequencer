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

drumDirectives.directive('sliderUpdate', function ($localstorage) { 
  return {
    require: 'ngModel',
    link: function(scope, elem, attr, ngModel) {
        scope.$watch('currentSong.bpm',function(oldVal, newVal) {
        $localstorage.set('sm-808-songList', scope.songList);
        $localstorage.set('sm-808-currentSong', scope.currentSong);
      });
    }
  };
});