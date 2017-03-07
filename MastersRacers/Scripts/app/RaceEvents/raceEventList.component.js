(function (angular) {

    'use strict';

    angular
        .module("racerApp")
        .component("raceEventList", {
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

        vm.loadActiveData = function () {

            vm.raceEvents = null;

            RaceEventService.getActive().then(vm.postLoadActiveData, HttpErrorService.onError);

        };

        vm.postLoadActiveData = function (resp) {

            $log.log("Active Race Events loaded.");

            vm.raceEvents = resp.data;

        };

        //vm.loadRefData = function () {

        //    $log.log("Starting Race Event RefData load.");

        //    vm.raceFormats = null;
        //    vm.locations = null;
        //    vm.activeSeason = null;

        //    var promiseFormat = RefDataService.getRaceFormats();
        //    var promiseLocations = LocationService.get();
        //    var promiseActiveSeason = SeasonService.getActive();

        //    $q.all([promiseFormat, promiseLocations, promiseActiveSeason]).then(function (resp) {
        //        vm.raceFormats = resp[0].data;
        //        vm.locations = resp[1].data;
        //        vm.activeSeason = resp[2].data;

        //        $log.log("Race Event RefData load complete.");

        //    });

        //};

        //vm.$onInit = function () {

        //    vm.loadRefData();
        //    vm.loadActiveData();

        //};

        vm.toggleAddPanel = function () {

            if (vm.addRaceEventCollapsed) {
                vm.editRaceEventCollapsed = true;
                vm.raceEventToEdit = null;
                vm.raceEventToAdd = RaceEventService.newRaceEvent(vm.activeSeason);
            }

            vm.addRaceEventCollapsed = !vm.addRaceEventCollapsed;

        };

        vm.toggleEditPanel = function (raceEvent) {

            if (vm.editRaceEventCollapsed && raceEvent !== null) {
                vm.addRaceEventCollapsed = true;
                vm.raceEventToAdd = null;
            }

            vm.editRaceEventCollapsed = (raceEvent === null);
            if (raceEvent !== null) {
                vm.raceEventToEdit = RaceEventService.cloneRaceEvent(raceEvent);
            }
        };

        vm.deleteRaceEvent = function (race) {
            
            vm.raceEventToDelete = race;

            RaceEventService.delete(race.id).then(vm.postDeleteRaceEvent, HttpErrorService.onError);

        };

        vm.postDeleteRaceEvent = function (resp) {

            var successful = resp.data;
            if (successful) {
                var idx = vm.raceEvents.indexOf(vm.raceEventToDelete);
                if (idx >= 0) {
                    vm.raceEvents.splice(idx, 1);
                    vm.raceEventToDelete = null;
                }
                else
                    $log.log("Deleted race event not found in list.");
            }

        };

        vm.addRaceEvent = function (toAdd) {

            RaceEventService.post(toAdd).then(vm.postAddRaceEvent, HttpErrorService.onError);

        };

        vm.postAddRaceEvent = function (resp) {

            var addedEvent = resp.data;

            if (addedEvent !== null) {
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

            RaceEventService.post(toUpdate).then(vm.postUpdateRaceEvent, HttpErrorService.onError);

        };

        vm.postUpdateRaceEvent = function (resp) {

            var updatedRaceEvent = resp.data;
            if (updatedRaceEvent !== null) {
                var idx = vm.find(updatedRaceEvent, vm.raceEvents);
                if (idx !== null) {
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