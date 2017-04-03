(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .component('individualRaceResult', {
            templateUrl: 'Scripts/app/RaceResults/individualRaceResult.template.html',
            controller: Controller,
            controllerAs: 'irCtrl',
            bindings: {
                raceResult: '<',
                onDelete: '&'
            }
        });

    Controller.$inject = ['$log', '$mdDialog'];
    function Controller($log, $mdDialog) {

        var vm = this;

        vm.triggerDelete = triggerDelete;

        function triggerDelete(event) {

            var confirm = $mdDialog.confirm()
                                   .title('Confirm Delete')
                                   .textContent('Please confirm that you wish to remove this Race Result.')
                                   .targetEvent(event)
                                   .ok('Delete')
                                   .cancel('Cancel');

            $mdDialog.show(confirm)
                     .then(doDelete, function() {/*Nop*/ });

        }

        function doDelete() {

            vm.onDelete(vm.raceResult);

        }

    }

}(this.angular));
