(function(){

    'use strict';

    /**
     *
     * overlayOpen
     *
     */

    var dependencies = [
        'ileoOverlayService'
    ];

    function overlayOpenDirective (
        ileoOverlayService
    ) {

        var overlayOpenLink = function overlayOpenLink ( scope , element , attrs ) {

            element.on( 'click' , function () {
                ileoOverlayService.open( scope.setup , attrs.toggleIleoOverlay );
            });
        }

        return {
            scope: {
                setup: '='
            },
            restrict: 'A',
            link: overlayOpenLink,
        }
    }

    angular.module('ileo.overlay').directive( 'openIleoOverlay' , dependencies.concat([ overlayOpenDirective ]));

})();
