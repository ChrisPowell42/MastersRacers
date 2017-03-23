(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .component('raceResultDefault', {
            templateUrl: 'Scripts/app/RaceResults/raceResultDefault.template.html',
            controller: Controller,
            controllerAs: 'rrCtrl',
            bindings: {
                racePhases: '<',
                seasonRaces: '<',
                selectedPhase: '<',
                selectedRace: '<',
                activeSeason: '<'
            }
        });

    Controller.$inject = ['$log', '$state', '$mdToast', 'RaceResultNavService', 'HttpErrorService'];
    function Controller($log, $state, $mdToast, RaceResultNavService, HttpErrorService) {

        var vm = this;

        vm.navigateToDetail = navigateToDetail;
        vm.phaseChange = phaseChange;

        function navigateToDetail() {

            RaceResultNavService.navigateToRaceResultAction(vm.selectedRace);

        }

        function phaseChange() {

            vm.selectedRace = null;

        }

    }

}(this.angular));
