'use strict';

var soundDirectives = angular.module('soundDirectives', []);

soundDirectives.directive('unique', function (SongUtils) { 
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

soundDirectives.directive('sliderUpdate', function ($localstorage, $rootScope) { 
  return {
    require: 'ngModel',
    link: function(scope, elem, attr, ngModel) {
      scope.$watch('currentSong.bpm',function(newVal, oldVal) {
        var stepInterval =  Math.round(60000/parseInt(newVal, 10));
        $rootScope.$emit('setStepInterval', stepInterval);
        $localstorage.set('sm-808-songList', scope.songList);
        $localstorage.set('sm-808-currentSong', scope.currentSong);
        scope.stopSequence();
      });
    }
  };
});

soundDirectives.directive('selectUpdate', function ($localstorage, SongUtils) { 
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