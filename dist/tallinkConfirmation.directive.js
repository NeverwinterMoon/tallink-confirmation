'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = confirmation;
function confirmation($compile) {
  return {
    restrict: 'E',
    scope: {
      content: '='
    },
    template: '<content></content>',
    link: linkFunction
  };

  function linkFunction($scope, element) {
    $scope.$watch('content', function (newContent) {
      if (!newContent) return;

      var forEach = Array.prototype.forEach,
          contentEl = element.find('content');

      contentEl.html(newContent);
      updateHeader();
      updateBody();

      $compile(contentEl.contents())($scope);

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
}