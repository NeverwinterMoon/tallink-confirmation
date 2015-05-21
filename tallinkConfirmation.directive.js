'use strict';

angular.module('tallink-confirmation')
  .directive('confirmation', function($compile) {
    return {
      restrict:      'E'
      , scope:       {
        content: '='
      }
      , templateUrl: 'tallinkConfirmation.html'
      , link:        linkFunction
    };

    function linkFunction($scope, element) {
      $scope.$watch('content', function(newContent) {
        if (!newContent) return;

        var forEach = Array.prototype.forEach
          , contentEl = element.find('content')
          ;

        contentEl.html(newContent);
        updateHeader();
        updateBody();

        $compile(contentEl.contents())($scope);

        function updateHeader() {
          var counter = 0
            , headerEls = contentEl[0].querySelectorAll('[confirmationHeader]')
            ;

          forEach.call(headerEls, function(el) {
            el.setAttribute('ng-click', 'unfoldOneAndCloseAllOthers("showConfirmation", ' + counter + ', ' + headerEls.length + ')');
            counter++;
          });
        }

        function updateBody() {
          var counter = 0
            , bodyEls = contentEl[0].querySelectorAll('[confirmationBody]')
            ;

          forEach.call(bodyEls, function(el) {
            el.querySelector('div').setAttribute('ng-init', 'showConfirmation' + counter + '=' + (counter === 0));
            el.querySelector('div').setAttribute('ng-show', 'showConfirmation' + counter);
            el.querySelector('div').setAttribute('animation', 'slide-up-down');
            el.querySelector('div').style.overflowY = 'hidden';
            counter++;
          });
        }
      });

      $scope.unfoldOneAndCloseAllOthers = function(elementToUnfoldName, elementToUnfoldIndex, allElementsCount) {
        for (var i = 0; i < allElementsCount; i++) {
          if (i === elementToUnfoldIndex) {
            $scope[elementToUnfoldName + i] = !$scope[elementToUnfoldName + i];
            continue;
          }
          $scope[elementToUnfoldName + i] = false;
        }
      }
    }
  })
;
