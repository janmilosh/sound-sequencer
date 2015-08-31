var soundFilters = angular.module('soundFilters', [])

soundFilters.filter('slice', function() {
  return function(arr, end) {
    return arr.slice(0, end);
  };
});
