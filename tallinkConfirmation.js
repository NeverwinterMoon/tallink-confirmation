(function(factory) {
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory(require('angular'));
  }
}(function(angular) {
  'use strict';

  return angular.module('tallink-confirmation', [])
    .directive('confirmation', require('./tallinkConfirmation.directive'))
    ;
}));
