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

    Controller.$inject = ['$log', 'RaceEventService', 'RefDataService', 'SeasonService', 'LocationService', 'HttpErrorService'];
    function Controller($log, RaceEventService, RefDataService, SeasonService, LocationService, HttpErrorService) {

        var vm = this;

        vm.addRaceEventCollapsed = true;
        vm.editRaceEventCollapsed = true;

        vm.raceEventToEdit = null;
        vm.raceEventToAdd = null;
        vm.raceEventToDelete = null;

        vm.loadActiveData = loadActiveData;
        vm.updateRaceEvent = updateRaceEvent;
        vm.toggleAddPanel = toggleAddPanel;
        vm.toggleEditPanel = toggleEditPanel;
        vm.deleteRaceEvent = deleteRaceEvent;
        vm.addRaceEvent = addRaceEvent;

        function loadActiveData() {

            vm.raceEvents = null;

            RaceEventService.getActive()
                            .then(postLoadActiveData, HttpErrorService.onError);

        }

        function postLoadActiveData(resp) {

            $log.log('Active Race Events loaded.');

            vm.raceEvents = resp.data;

        }

        function toggleAddPanel() {

            if (vm.addRaceEventCollapsed) {
                vm.editRaceEventCollapsed = true;
                vm.raceEventToEdit = null;
                vm.raceEventToAdd = RaceEventService.newRaceEvent(vm.activeSeason);
            }

            vm.addRaceEventCollapsed = !vm.addRaceEventCollapsed;

        }

        function toggleEditPanel(raceEvent) {

            if (vm.editRaceEventCollapsed && raceEvent !== null) {
                vm.addRaceEventCollapsed = true;
                vm.raceEventToAdd = null;
            }

            vm.editRaceEventCollapsed = (raceEvent === null);
            if (raceEvent !== null) {
                vm.raceEventToEdit = RaceEventService.cloneRaceEvent(raceEvent);
            }
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

            vm.addRaceEventCollapsed = true;
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
                    vm.editRaceEventCollapsed = true;
                } else {
                    $log.log('Could not find updated race event in response.');
                }
            }

        }

    }

}(this.angular));
