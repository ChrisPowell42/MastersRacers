(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .component('raceResultScheduled', {
            templateUrl: 'Scripts/app/RaceResults/raceResultScheduled.template.html',
            controller: Controller,
            controllerAs: 'rsCtrl',
            bindings: {
                raceItem: '<'
            }
        });

    Controller.$inject = ['$log', '$mdDialog', 'RaceResultNavService'];
    function Controller($log, $mdDialog, RaceResultNavService) {

        var vm = this;

        vm.toggleMoveToRecording = toggleMoveToRecording;

        function toggleMoveToRecording(event) {

            var confirm = $mdDialog.confirm()
                                .title('Advance to Recording Race?')
                                .textContent('Please confirm that you wish to start recording times for this race event.')
                                .targetEvent(event)
                                .ok('Proceed')
                                .cancel('Cancel');

            $mdDialog.show(confirm)
                     .then(proceed, function() {/*nop*/ });
        }

        function proceed() {

            RaceResultNavService.proceedToRaceRecording(vm.raceItem);

        }

    }

}(this.angular));
