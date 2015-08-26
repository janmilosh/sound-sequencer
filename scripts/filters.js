var drumFilters = angular.module('drumFilters', [])

drumFilters.filter('slice', function() {
  return function(arr, end) {
    return arr.slice(0, end);
  };
});
