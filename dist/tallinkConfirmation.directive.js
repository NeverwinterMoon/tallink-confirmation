'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TallinkConfirmationDirective = (function () {
  /*@ngInject*/

  function TallinkConfirmationDirective($compile) {
    _classCallCheck(this, TallinkConfirmationDirective);

    this.restrict = 'E';
    this.scope = { content: '=' };
    this.template = '<content></content>';
    this.$compile = $compile;
  }

  _createClass(TallinkConfirmationDirective, [{
    key: 'linkFunction',
    value: function linkFunction($scope, element) {
      $scope.$watch('content', function (newContent) {
        if (!newContent) return;

        var forEach = Array.prototype.forEach,
            contentEl = element.find('content');

        contentEl.html(newContent);
        updateHeader();
        updateBody();

        this.$compile(contentEl.contents())($scope);

        function updateHeader() {
          var counter = 0,
              headerEls = contentEl[0].querySelectorAll('[confirmationHeader]');

          forEach.call(headerEls, function (el) {
            el.setAttribute('ng-click', 'unfoldOneAndCloseAllOthers("showConfirmation", ' + counter + ', ' + headerEls.length + ')');
            counter++;
          });
        }

        function updateBody() {
          var counter = 0,
              bodyEls = contentEl[0].querySelectorAll('[confirmationBody]');

          forEach.call(bodyEls, function (el) {
            var hidableBlock = el.querySelector('div');

            if (counter === 0) {
              appendInfoMessageTo(hidableBlock);
              appendMissingPassengersSectionTo(el);
            }

            hidableBlock.setAttribute('ng-init', 'showConfirmation' + counter + '=' + (counter === 0));
            hidableBlock.setAttribute('ng-show', 'showConfirmation' + counter);
            hidableBlock.setAttribute('animation', 'slide-up-down');
            hidableBlock.style.overflowY = 'hidden';
            counter++;
          });

          function appendInfoMessageTo(el) {
            el.appendChild(angular.element('<div information></div>')[0]);
          }

          function appendMissingPassengersSectionTo(el) {
            el.appendChild(angular.element('<div missing-passengers></div>')[0]);
          }
        }
      });

      $scope.unfoldOneAndCloseAllOthers = function (elementToUnfoldName, elementToUnfoldIndex, allElementsCount) {
        for (var i = 0; i < allElementsCount; i++) {
          if (i === elementToUnfoldIndex) {
            $scope[elementToUnfoldName + i] = !$scope[elementToUnfoldName + i];
            continue;
          }
          $scope[elementToUnfoldName + i] = false;
        }
      };
    }
  }]);

  return TallinkConfirmationDirective;
})();

exports.default = TallinkConfirmationDirective;