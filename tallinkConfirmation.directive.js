'use strict';

angular.module('tallink-confirmation')
  .directive('confirmation', function() {
    return {
      restrict:      'E'
      , scope:       {
        content:      '='
        , stylesheet: '@'
      }
      , templateUrl: 'tallinkConfirmation.html'
    };
  })
;