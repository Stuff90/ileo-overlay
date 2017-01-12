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

        $scope.withScope = function() {
            console.info('var1');

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