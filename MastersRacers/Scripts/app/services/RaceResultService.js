(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .service('RaceResultService', RaceResultService);

    RaceResultService.$inject = ['$log', '$http', '$state', 'RaceEventService', 'HttpErrorService'];
    function RaceResultService($log, $http, $state, RaceEventService, HttpErrorService) {

        var vm = this;

        vm.getResultsForRace = getResultsForRace;
        vm.getResultsForRaceResolved = getResultsForRaceResolved;
        vm.createResultsForRace = createResultsForRace;
        vm.createResultsForRaceResolved = createResultsForRaceResolved;

        function getResultsForRace(race) {
            var response = $http.get('api/race/' + race.id + '/raceresults');
            return response;
        }

        function getResultsForRaceResolved(race) {

            return vm.getResultsForRace(race).then(function(resp) {
                return resp.data;
            }, HttpErrorService.onError);

        }

        function createResultsForRace(race) {
            var response = $http.get('api/race/' + race.id + '/raceresults/new');
            return response;
        }

        function createResultsForRaceResolved(race) {

            return vm.createResultsForRace(race).then(function(resp) {
                return resp.data;
            }, HttpErrorService.onError);

        }

    }

}(this.angular));
