(function(){

    'use strict';

    /**
     *
     * overlayToggle
     *
     */

    var dependencies = [
        'ileoOverlayService'
    ];

    function overlayToggleDirective (
        ileoOverlayService
    ) {

        var overlayToggleLink = function overlayToggleLink ( scope , element , attrs ) {
            element.on( 'click' , function () {
                ileoOverlayService.toggle( scope.setup , attrs.toggleIleoOverlay );
            });
        }

        return {
            scope: {
                setup: '='
            },
            restrict: 'A',
            link: overlayToggleLink,
        }
    }

    angular.module('ileo.overlay').directive( 'toggleIleoOverlay' , dependencies.concat([ overlayToggleDirective ]));

})();
