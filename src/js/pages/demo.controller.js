(function () {

    var dependencies = [
        '$scope',
    ]

    function DemoController(
        $scope
    ) {
        console.info('$scope');
    }

    angular.module( 'ileo-overlay.demo' , [
        'ileo.overlay'
    ]). controller([ dependencies.concat( DemoController )]);

})();