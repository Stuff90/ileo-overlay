(function () {

    'use strict';

     /*==================================
     =            Component             =
     * ==================================*
     *
     * Component name : ileoOverlay
     *
     *
     *-------  Component Config  -------*/


    var config = {
        transclude: false,
        dependencies: [
            '$q',
            '$http',
            '$scope',
            '$compile',
            '$element',
            '$timeout',
            'ileoOverlayService',
            'ileoOverlayConfigService'
        ],
        bindings: {},
        template:
            '<aside class="ileoOverlay">' +
                '<div class="ileoOverlay--wrapper" ng-style="$ctrl.overlayStyle"></div>' +
                '<div class="ileoOverlay--backdrop" ng-click="$ctrl.close()" ng-style="$ctrl.backdropStyle"></div>' +
            '</aside>',
    }

    /*=======  End of Config  ========*/



    /**
     *
     * Controller Definition
     *
     */

    function ileoOverlayComponentController (
        $q,
        $http,
        $scope,
        $compile,
        $element,
        $timeout,
        ileoOverlayService,
        ileoOverlayConfigService
    ) {

        var ctrl       = this,
        params         = $scope.$parent.params,
        contentWrapper = angular.element( $element[0].getElementsByClassName('ileoOverlay--wrapper'));

        $timeout( initOverlay );

        ctrl.close = ileoOverlayService.close;

        function initOverlay() {
            if( 'hasBackdrop' in params && params.hasBackdrop ){
                // ctrl.backdropStyle = ileoOverlayConfigService.backdropCss;
            }

            $q.all({
                data: getAjaxData( params ),
                template: getTemplate( params )
            }).then( setupOverlay ).catch( raiseError );
        }

        function getTemplate( params ) {
            var deferred = $q.defer();

            if( 'template' in params ) {
                deferred.resolve( params.template );
            } else if ( 'templateUrl' in params ) {
                $http({
                    method: 'GET',
                    url: params.templateUrl
                }).then(function ( response ) {
                    deferred.resolve( response.data );
                }, function ( response ) {
                    deferred.reject({
                        error: 'Unable to retrieve the template from templateUrl',
                        ajaxTrace: response
                    });
                });
            } else {
                deferred.reject({
                    error: 'You must specify a template or a templateUrl'
                });
            }

            return deferred.promise;
        }

        function getAjaxData( params ) {
            var deferred = $q.defer();


            if( 'dataUrl' in params ) {
                $http({
                    method: 'GET',
                    url: params.dataUrl
                }).then(function ( response ) {
                    deferred.resolve( response.data );
                }, function ( response ) {
                    deferred.reject({
                        error: 'Unable to retrieve data from given action URL',
                        ajaxTrace: response
                    });
                });
            } else {
                deferred.resolve({});
            }

            return deferred.promise;
        }

        function useBackdrop( ) {
            var deferred = $q.defer();
            return deferred.promise;
        }

        function raiseError( theError ) {
            console.error( theError );
        }

        function setupOverlay( theOverlaySetup ) {
            ctrl.data = theOverlaySetup.data;
            appendTemplate( theOverlaySetup.template ).then(function () {
                // ctrl.overlayStyle  = ileoOverlayConfigService.overlayCss;
            }).catch(function ( ngError ) {
                raiseError('The template is not compilable: ' + ngError );
            });
        }

        function appendTemplate( theTemplate ) {
            var deferred = $q.defer();

            try {
                $compile( theTemplate )( $scope , function ( $template ) {
                    contentWrapper.append( $template );
                    $timeout( deferred.resolve());
                });
            } catch ( error ) {
                deferred.reject( error );
            }

            return deferred.promise;
        }

    }


    /**
     *
     * Component Registration
     *
     */

    ileoOverlayComponentController.$inject = config.dependencies;

    angular.module('ileo.overlay').component( 'ileoOverlay' , {
        bindings: config.bindings,
        template: config.template,
        controller: ileoOverlayComponentController
    });


})();
