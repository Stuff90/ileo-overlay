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
                ileoOverlayService.toggle({
                    hasBackdrop: true,
                    templateUrl: APP_PATH + 'modules/overlay/templates/overlay.template.html',
                    dataUrl: 'https://spreadsheets.google.com/feeds/list/1aZDJcVr047xcZww0AdwWQiWWCIGiLNzd6Z13kjNAiuI/1/public/values?alt=json'
                }, attrs.toggleIleoOverlay );
            });
        }

        return {
            scope: {},
            restrict: 'A',
            link: overlayToggleLink,
        }
    }

    angular.module('ileo.overlay').directive( 'toggleIleoOverlay' , dependencies.concat([ overlayToggleDirective ]));

})();
