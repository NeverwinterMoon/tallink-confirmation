'use strict';

angular.module('tallink-confirmation')
  .directive('confirmation', function($compile) {
    return {
      restrict:      'E'
      , scope:       {
        content:      '='
        , stylesheet: '@'
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
            el.setAttribute('ng-click', 'showConfirmation' + counter + '=!showConfirmation' + counter);
            counter++;
          });
        }

        function updateBody() {
          var counter = 0
            , bodyEls = contentEl[0].querySelectorAll('[confirmationBody]')
            ;

          forEach.call(bodyEls, function(el) {
            el.querySelector('div').setAttribute('ng-show', '!!!showConfirmation' + counter);
            el.querySelector('div').setAttribute('animation', 'slide-up-down');
            el.querySelector('div').style.overflowY = 'hidden';
            counter++;
          });
        }
      });
    }
  })
;
