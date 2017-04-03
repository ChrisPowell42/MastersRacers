(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .component('raceResultsRecording', {
            templateUrl: 'Scripts/app/RaceResults/raceResultsRecording.template.html',
            controller: Controller,
            controllerAs: 'rCtrl',
            bindings: {
                raceItem: '<',
                raceResults: '<'
            }
        });

    Controller.$inject = ['$log', 'RaceResultService', 'CacheService'];
    function Controller($log, RaceResultService, CacheService) {

        var vm = this;

        vm.deleteResult = deleteResult;
        vm.saveResults = saveResults;
        vm.finalizeResults = finalizeResults;

        function deleteResult(resultToDelete) {

        }

        function saveResults() {

        }

        function finalizeResults() {

        }

    }

}(this.angular));
