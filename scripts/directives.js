'use strict';

var drumDirectives = angular.module('drumDirectives', []);

drumDirectives.directive('unique', function (SongUtils) { 
  return {
    require: 'ngModel',
    link: function(scope, elem, attr, ngModel) {
      scope.$watch('songname',function(newVal, oldVal) {
        var isUnique = SongUtils.isUniqueSongname(newVal, scope.songList);
        ngModel.$setValidity('unique', isUnique);
      });
    }
  };
});

drumDirectives.directive('sliderUpdate', function ($localstorage) { 
  return {
    require: 'ngModel',
    link: function(scope, elem, attr, ngModel) {
      scope.$watch('currentSong.bpm',function(newVal, oldVal) {
        $localstorage.set('sm-808-songList', scope.songList);
        $localstorage.set('sm-808-currentSong', scope.currentSong);
      });
    }
  };
});

drumDirectives.directive('selectUpdate', function ($localstorage, SongUtils) { 
  return {
    require: 'ngModel',
    link: function(scope, elem, attr, ngModel) {
      scope.$watch('selectedStepsOption',function(newVal, oldVal) {
        scope.currentSong.steps = parseInt(newVal, 10);
        scope.range = SongUtils.setRangeArray(scope.currentSong.steps);
        $localstorage.set('sm-808-songList', scope.songList);
        $localstorage.set('sm-808-currentSong', scope.currentSong);
      });
    }
  };
});