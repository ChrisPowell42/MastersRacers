(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .component('raceEventList', {
            templateUrl: 'Scripts/app/RaceEvents/raceEventList.template.html',
            controller: Controller,
            controllerAs: 'reList',
            bindings: {
                raceEvents: '<',
                raceFormats: '<',
                locations: '<',
                activeSeason: '<',
            }
        });

    Controller.$inject = ['$log', '$state', 'RaceEventService', 'RefDataService', 'SeasonService', 'LocationService', 'CacheService', 'HttpErrorService'];
    function Controller($log, $state, RaceEventService, RefDataService, SeasonService, LocationService, CacheService, HttpErrorService) {

        var vm = this;

        vm.raceEventToDelete = null;

        vm.loadActiveData = loadActiveData;
        vm.updateRaceEvent = updateRaceEvent;
        vm.deleteRaceEvent = deleteRaceEvent;
        vm.addRaceEvent = addRaceEvent;
        vm.handleModifyRace = handleModifyRace;
        vm.showRaces = showRaces;

        function showRaces() {
            $state.go('races.list');
        }

        function loadActiveData() {

            vm.raceEvents = null;

            RaceEventService.getActive()
                            .then(postLoadActiveData, HttpErrorService.onError);

        }

        function postLoadActiveData(resp) {

            $log.log('Active Race Events loaded.');

            vm.raceEvents = resp.data;

        }

        function deleteRaceEvent(race) {

            vm.raceEventToDelete = race;

            RaceEventService.delete(race.id)
                            .then(postDeleteRaceEvent, HttpErrorService.onError);

        }

        function postDeleteRaceEvent(resp) {

            var successful = resp.data;
            if (successful) {
                var idx = vm.raceEvents.indexOf(vm.raceEventToDelete);
                if (idx >= 0) {
                    vm.raceEvents.splice(idx, 1);
                    vm.raceEventToDelete = null;
                } else {
                    $log.log('Deleted race event not found in list.');
                }
            }

        }

        function addRaceEvent(toAdd) {

            RaceEventService.post(toAdd)
                            .then(postAddRaceEvent, HttpErrorService.onError);

        }

        function postAddRaceEvent(resp) {

            var addedEvent = resp.data;

            if (addedEvent !== null) {
                vm.raceEvents.push(addedEvent);
            } else {
                $log.log('Could not find added event in response.');
            }
        }

        function findIdxById(raceEvent, raceEventList) {

            for (var i = 0; i < raceEventList.length; i++) {
                if (raceEventList[i].id === raceEvent.id) {
                    return i;
                }
            }

            return null;

        }

        function updateRaceEvent(toUpdate) {

            RaceEventService.post(toUpdate)
                            .then(postUpdateRaceEvent, HttpErrorService.onError);

        }

        function postUpdateRaceEvent(resp) {

            var updatedRaceEvent = resp.data;
            if (updatedRaceEvent !== null) {
                var idx = findIdxById(updatedRaceEvent, vm.raceEvents);
                if (idx !== null) {
                    vm.raceEvents[idx] = updatedRaceEvent;
                } else {
                    $log.log('Could not find updated race event in response.');
                }
            }

        }

        function handleModifyRace() {

            var changedRace = CacheService.popItem('Races');
            changedRace.scheduledStartTime = changedRace.startTime;

            $log.log(changedRace);

            if (!changedRace.id) {
                addRaceEvent(changedRace);
            } else {
                updateRaceEvent(changedRace);
            }

        }

    }

}(this.angular));
