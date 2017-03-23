(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .service('RaceResultNavService', RaceResultNavService);

    RaceResultNavService.$inject = ['$log', '$state', 'RaceEventService', 'HttpErrorService'];
    function RaceResultNavService($log, $state, RaceEventService, HttpErrorService) {

        var vm = this;

        vm.navigateToRaceResultAction = navigateToRaceResultAction;
        vm.proceedToRaceRecording = proceedToRaceRecording;

        vm.raceIsScheduled = raceIsScheduled;
        vm.raceIsRecording = raceIsRecording;
        vm.raceIsFinalized = raceIsFinalized;

        var scheduledId = 'A0DA96DF-A0C5-4361-8ADD-05D9A0DF240B';
        var recordingId = 'BDD2A2B3-37B7-4B8D-9969-3C06DF660C1C';
        var finalizedId = '2D5B8ACC-6CAA-4133-8251-710D715B7002';

        function raceIsScheduled(race) {

            return race.racePhaseId.toUpperCase() === scheduledId;

        }

        function raceIsRecording(race) {

            return race.racePhaseId.toUpperCase() === recordingId;

        }

        function raceIsFinalized(race) {

            return race.racePhaseId.toUpperCase() === finalizedId;

        }

        function navigateToRaceResultAction(subjectRace) {

            if (raceIsScheduled(subjectRace)) {

                $state.go('raceResults.scheduled', {raceId: subjectRace.id});
                return;
            }

            if (raceIsRecording(subjectRace)) {
                $state.go('raceResults.recording', {raceId: subjectRace.id});
                return;
            }

            if (raceIsFinalized(subjectRace)) {
                $log.log('Finalized');
            }

            $log.log('Navigated');

        }

        function proceedToRaceRecording(subjectRace) {

            subjectRace.racePhaseId = recordingId;

            RaceEventService.post(subjectRace)
                            .then(afterSaveToRecording, HttpErrorService.onError);

        }

        function afterSaveToRecording(resp) {

            var savedRace = resp.data;

            $state.go('raceResults.recording', {raceId: savedRace.id});

        }

    }

}(this.angular));
