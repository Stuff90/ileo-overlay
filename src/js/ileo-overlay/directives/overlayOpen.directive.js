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
                ileoOverlayService.open({
                    // overlap: true,
                    hasBackdrop: true,
                    templateUrl: 'src/js/ileo-overlay/templates/overlay.template.html',
                    dataUrl: 'https://spreadsheets.google.com/feeds/list/1aZDJcVr047xcZww0AdwWQiWWCIGiLNzd6Z13kjNAiuI/1/public/values?alt=json'
                }, attrs.toggleIleoOverlay );
            });
        }

        return {
            scope: false,
            restrict: 'A',
            link: overlayOpenLink,
        }
    }

    angular.module('ileo.overlay').directive( 'openIleoOverlay' , dependencies.concat([ overlayOpenDirective ]));

})();
