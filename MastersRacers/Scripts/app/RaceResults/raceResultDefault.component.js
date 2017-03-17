(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .component('raceResultDefault', {
            templateUrl: 'Scripts/app/RaceResults/raceResultDefault.template.html',
            controller: Controller,
            controllerAs: 'rrCtrl',
            bindings: {
                racePhases: '<'
            }
        });

    Controller.$inject = ['$log', '$state', 'RefDataService', 'HttpErrorService'];
    function Controller($log, $state, RefDataService, HttpErrorService) {

        var vm = this;

        vm.selectedPhase = null;

        vm.checkSelectedPhase = checkSelectedPhase;
        vm.setRaceFilter = setRaceFilter;

        vm.$onInit = function() {
            $log.log(vm.racePhases);
        };

        function checkSelectedPhase() {
            $log.log(vm.selectedPhase);
        }

        function setRaceFilter(event) {
            $log.log('Test');
        }

    }

}(this.angular));
