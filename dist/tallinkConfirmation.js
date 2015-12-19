'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _angular = require('angular');

var _tallinkConfirmation = require('./tallinkConfirmation.directive');

var _tallinkConfirmation2 = _interopRequireDefault(_tallinkConfirmation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _angular.module)('tallink-confirmation', []).directive('confirmation', function () {
  return new _tallinkConfirmation2.default();
});