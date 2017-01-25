(function () {

    var dependencies = [
        '$scope',
        '$rootScope',
        'ileoOverlayService'
    ]

    function DemoController(
        $scope,
        $rootScope,
        ileoOverlayService
    ) {

        $rootScope.text = 'from $rootScope';
        $scope.text = 'from $scope';

        $scope.$on('ileo:overlay:open' , function ( $event, overlayId ) {
            console.info('Opened overlay', overlayId);
        });

        $scope.$on('ileo:overlay:close' , function ( $event, overlayId ) {
            console.info('Closed overlay', overlayId);
        });

        $scope.withScope = function() {

            ileoOverlayService.toggle({
                hasBackdrop: true,
                templateUrl: 'src/js/ileo-overlay/templates/overlay.template.html',
                scope: $scope
            }, 'withScope' );
        }

        $scope.withoutScope = function() {
            ileoOverlayService.toggle({
                hasBackdrop: true,
                templateUrl: 'src/js/ileo-overlay/templates/overlay.template.html',
            }, 'withoutScope' );
        }

    }

    DemoController.$inject = dependencies;

    angular.module( 'ileo-overlay.demo' , [
        'ileo.overlay'
    ]).controller( 'DemoController' , DemoController );

})();