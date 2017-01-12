(function(){

    'use strict';

     /*================================
     =            Service             =
     * ================================*
     *
     * Service name : ileoOverlayConfigService
     *
     *
     *----  Service Dependencies  ----*/

    var dependencies = [
        'ILEO_OVERLAY_CSS'
    ];

    /*=======  End of Config  ========*/



    /**
     *
     * Controller Definition
     *
     */

    function ileoOverlayConfigService (
        ILEO_OVERLAY_CSS
    ) {

        var IleoOverlayServiceClass = function IleoOverlayServiceClass(){
            var self = this;

            self.overlayCss  = ILEO_OVERLAY_CSS.overlay;
            self.backdropCss = ILEO_OVERLAY_CSS.backdrop;
        }

        IleoOverlayServiceClass.prototype = {

            setOverlayCss  : function setOverlayCss( cssKey , cssValue ) {
                this.overlayCss[ cssKey ] = cssValue;
            },
            setBackdropCss : function setBackdropCss( cssKey , cssValue ) {
                this.backdropCss[ cssKey ] = cssValue;
            }
        }

        return new IleoOverlayServiceClass();

    }


    /**
     *
     * Service Registration
     *
     */

    ileoOverlayConfigService.$inject = dependencies;

    angular.module('ileo.overlay')
        .service( 'ileoOverlayConfigService' , ileoOverlayConfigService );

})();
