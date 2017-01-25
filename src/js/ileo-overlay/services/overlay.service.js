(function(){

    'use strict';

     /*================================
     =            Service             =
     * ================================*
     *
     * Service name : ileoOverlayService
     *
     *
     *----  Service Dependencies  ----*/

    var dependencies = [
        '$q',
        '$compile',
        '$timeout',
        '$document',
        '$rootScope',
        'ILEO_OVERLAY_DEFAULT_PARAMS'
    ];

    /*=======  End of Config  ========*/



    /**
     *
     * Controller Definition
     *
     */

    function ileoOverlayService (
        $q,
        $compile,
        $timeout,
        $document,
        $rootScope,
        ILEO_OVERLAY_DEFAULT_PARAMS
    ) {

        var IleoOverlayServiceClass = function IleoOverlayServiceClass(){
            var self = this;

            self.currentOverlays = {};

            document.onkeyup = self.keyPressed;
            $rootScope.$on( 'ileo:overlay:escape' , function () {
                self.closeOverlay();
            });

            return {
                open: function ( params , id ) {
                    return self.openOverlay( params || ILEO_OVERLAY_DEFAULT_PARAMS , id );
                },
                close: function ( id ) {
                    return self.closeOverlay( id );
                },
                toggle: function ( params , id ) {
                    return self.currentOverlays[ id ] ? this.close( id ) : this.open( params , id );
                },
            }
        }

        IleoOverlayServiceClass.prototype = {

            keyPressed: function keyPressed( event ) {
                event = event || window.event;
                if ( event.keyCode === 27 ) {
                    $rootScope.$broadcast( 'ileo:overlay:escape' );
                }
            },

            creaetId: function creaetId() {
                return Math.floor( Math.random() * new Date().getTime()).toString().substr( 0 , 12 );
            },

            openOverlay: function openOverlay( overlayParams , overlayId ) {
                var self  = this,
                deferred  = $q.defer(),
                overlayId = overlayId || self.creaetId();

                if( !Object.keys( self.currentOverlays ).includes( overlayId ) || overlayParams.overlap === true ) {
                    self.currentOverlays[ overlayId ] = {};
                    var theScope = $rootScope.$new();

                    $compile( '<ileo-overlay></ileo-overlay>' )( theScope , function ( $compiledOverlay , overlayScope ) {
                        overlayScope.params = overlayParams;
                        self.currentOverlays[ overlayId ].$scope    =  overlayScope;
                        self.currentOverlays[ overlayId ].$element  =  $compiledOverlay;
                        self.currentOverlays[ overlayId ].createdAt =  new Date().getTime();

                        $document.find('body').append( self.currentOverlays[ overlayId ].$element );
                        $timeout(function () {
                            deferred.resolve();
                            $rootScope.$broadcast('ileo:overlay:open' , overlayId );
                        });
                    });
                }

                return deferred.promise;
            },

            getLastCreatedOverlay: function getLastCreatedOverlay() {
                var self = this;

                if( Object.keys( self.currentOverlays ).length <= 0 ) {
                    return false;
                }
                return Object.keys( self.currentOverlays ).reduce(function ( lastOpenedId , anOverlayId ) {
                    if( !lastOpenedId || self.currentOverlays[ anOverlayId ].createdAt > self.currentOverlays[ lastOpenedId ].createdAt ) {
                        return anOverlayId;
                    }
                    return lastOpenedId;
                });
            },

            closeOverlay: function closeOverlay( overlayId ) {
                var deferred     = $q.defer(),
                closingOverlayId = overlayId || this.getLastCreatedOverlay();

                if( closingOverlayId ) {
                    this.currentOverlays[ closingOverlayId ].$scope.$destroy();
                    this.currentOverlays[ closingOverlayId ].$element.empty().remove();
                    delete this.currentOverlays[ closingOverlayId ];
                    $timeout( function () {
                        deferred.resolve();
                        $rootScope.$broadcast('ileo:overlay:close' , closingOverlayId );
                    });
                } else {
                    deferred.reject();
                }

                return deferred.promise;
            }

        }

        return new IleoOverlayServiceClass();

    }


    /**
     *
     * Service Registration
     *
     */

    ileoOverlayService.$inject = dependencies;

    angular.module('ileo.overlay')
        .service( 'ileoOverlayService' , ileoOverlayService );

})();
