(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("raceEventList", {
            templateUrl: 'Scripts/app/templates/raceEventList.html',
            controller: controller,
            controllerAs: 'reList'
        });

    controller.$inject = ['$log', '$q', '$mdToast', 'raceEventService', 'refDataService', 'seasonService', 'locationService'];
    function controller($log, $q, $mdToast, raceEventService, refDataService, seasonService, locationService) {

        var vm = this;

        vm.raceEvents = [];
        vm.raceFormats = [];

        vm.locations = [];
        vm.activeSeason = {};

        vm.addRaceEventCollapsed = true;
        vm.editRaceEventCollapsed = true;

        vm.raceEventToEdit = null;
        vm.raceEventToAdd = null;
        vm.raceEventToDelete = null;

        vm.cloneRaceEvent = function (raceEventToClone) {

            return {
                id: raceEventToClone.id,
                location: raceEventToClone.location,
                season: raceEventToClone.season,
                raceFormat: raceEventToClone.raceFormat,
                runCount: raceEventToClone.runCount,
                raceName: raceEventToClone.raceName,
                scheduledStartTime: new Date(raceEventToClone.scheduledStartTime),
                notes: raceEventToClone.notes
            };
        };

        vm.newRaceEvent = function () {

            return {
                id: null,
                location: null,
                season: vm.activeSeason,
                raceFormat: null,
                runCount: 2,
                raceName: '',
                scheduledStartTime: new Date(),
                notes: ''
            };

        };

        vm.onError = function (httpError) {

            $log.log(httpError.data);

            var errorToast = $mdToast.simple()
                                     .textContent('Race Event Error has occured: ' + httpError.status + ' - ' + httpError.statusText + ' (' + httpError.config.url + ')')
                                     .hideDelay(0)
                                     .action('Ok');

            $mdToast.show(errorToast).then(function (response) {
                $mdToast.hide(errorToast);
                vm.raceEventToDelete = null
            });

        };

        vm.loadActiveData = function () {

            vm.raceEvents = null;

            raceEventService.getActive().then(vm.postLoadActiveData, vm.onError);

        };

        vm.postLoadActiveData = function (resp) {

            $log.log("Active Race Events loaded.");

            vm.raceEvents = resp.data;

        };

        vm.loadRefData = function () {

            $log.log("Starting Race Event RefData load.");

            vm.raceFormats = null;
            vm.locations = null;
            vm.activeSeason = null;

            var promiseFormat = refDataService.getRaceFormats();
            var promiseLocations = locationService.get();
            var promiseActiveSeason = seasonService.getActive();

            $q.all([promiseFormat, promiseLocations, promiseActiveSeason]).then(function (resp) {
                vm.raceFormats = resp[0].data;
                vm.locations = resp[1].data;
                vm.activeSeason = resp[2].data;

                $log.log("Race Event RefData load complete.");

            });

        };

        vm.$onInit = function () {

            vm.loadRefData();
            vm.loadActiveData();

        }

        vm.toggleAddPanel = function () {

            if (vm.addRaceEventCollapsed) {
                vm.editRaceEventCollapsed = true;
                vm.raceEventToEdit = null;
                vm.raceEventToAdd = vm.newRaceEvent();
            }

            vm.addRaceEventCollapsed = !vm.addRaceEventCollapsed;

        };

        vm.toggleEditPanel = function (raceEvent) {

            if (vm.editRaceEventCollapsed && raceEvent != null) {
                vm.addRaceEventCollapsed = true;
                vm.raceEventToAdd = null;
            }

            vm.editRaceEventCollapsed = (raceEvent == null);
            if (raceEvent != null) {
                vm.raceEventToEdit = vm.cloneRaceEvent(raceEvent);
            }
        };

        vm.deleteRaceEvent = function (race) {
            
            vm.raceEventToDelete = race;

            raceEventService.delete(race.id).then(vm.postDeleteRaceEvent, vm.onError);

        };

        vm.postDeleteRaceEvent = function (resp) {

            var successful = resp.data;
            if (successful) {
                var idx = vm.raceEvents.indexOf(vm.raceEventToDelete);
                if (idx >= 0) {
                    vm.raceEvents.splice(idx, 1);
                    vm.raceEventToDelete = null
                }
                else
                    $log.log("Deleted race event not found in list.");
            };

        };

        vm.addRaceEvent = function (toAdd) {

            raceEventService.post(toAdd).then(vm.postAddRaceEvent, vm.onError);

        };

        vm.postAddRaceEvent = function (resp) {

            var addedEvent = resp.data;

            if (addedEvent != null) {
                vm.raceEvents.push(addedEvent);
            }
            else
                $log.log('Could not find added event in response.');

            vm.addRaceEventCollapsed = true;
        };

        vm.findIdxById = function (raceEvent, raceEventList) {

            for (var i = 0; i < raceEventList.length; i++) {
                if (raceEventList[i].id === raceEvent.id) {
                    return i;
                }
            }

            return null;

        };

        vm.updateRaceEvent = function (toUpdate) {

            raceEventService.post(toUpdate).then(vm.postUpdateRaceEvent, vm.onError);

        };

        vm.postUpdateRaceEvent = function (resp) {

            var updatedRaceEvent = resp.data;
            if (updatedRaceEvent != null) {
                var idx = vm.find(updatedRaceEvent, vm.raceEvents)
                if (idx != null) {
                    vm.raceEvents[idx] = updatedRaceEvent;
                    vm.editRaceEventCollapsed = true;
                }
                else {
                    $log.log("Could not find updated race event in response.");
                }
            }

        };

    }

}(this.angular));