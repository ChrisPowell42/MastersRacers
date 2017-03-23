(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .service('RaceResultService', RaceResultService);

    RaceResultService.$inject = ['$log', '$state', 'RaceEventService', 'HttpErrorService'];
    function RaceResultService($log, $state, RaceEventService, HttpErrorService) {

        var vm = this;

        function getResultsForRaceResolved(race) {



        }

    }

}(this.angular));
