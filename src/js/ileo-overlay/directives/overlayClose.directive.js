(function(){

    'use strict';

    /**
     *
     * overlayClose
     *
     */

    var dependencies = [
        'ileoOverlayService'
    ];

    function overlayCloseDirective (
        ileoOverlayService
    ) {

        var overlayCloseLink = function overlayCloseLink ( scope , element  ) {
            element.on( 'click' , function () {
                ileoOverlayService.close();
            });
        }

        return {
            scope: false,
            restrict: 'A',
            link: overlayCloseLink,
        }
    }

    angular.module('ileo.overlay').directive( 'closeIleoOverlay' , dependencies.concat([ overlayCloseDirective ]));

})();
