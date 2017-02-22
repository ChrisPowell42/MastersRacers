(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("raceEventList", {
            templateUrl: 'Scripts/app/templates/raceEventList.html',
            controller: controller,
            controllerAs: 'reList'
        });

    controller.$inject = ['$scope', '$log', '$q', 'raceEventService', 'refDataService', 'seasonService', 'locationService'];
    function controller($scope, $log, $q, raceEventService, refDataService, seasonService, locationService) {

        var vm = this;

        vm.raceEvents = [];
        vm.raceFormats = [];

        vm.locations = [];
        vm.activeSeason = {};

        vm.addRaceEventCollapsed = true;
        vm.editRaceEventCollapsed = true;

        vm.raceEventToEdit = null;
        vm.raceEventToAdd = null;

        vm.cloneRaceEvent = function (raceEventToClone) {

            return {
                id: raceEventToClone.id,
                location: raceEventToClone.location,
                season: raceEventToClone.season,
                raceFormat: raceEventToClone.raceFormat,
                runCount: raceEventToClone.runCount,
                raceName: raceEventToClone.raceName,
                scheduledStartTime: raceEventToClone.scheduledStartTime,
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

        vm.loadActiveData = function () {

            vm.raceEvents = null;

            var promise = raceEventService.getActive();

            $scope.combineResult = $q.all([promise]).then(function (resp) {
                vm.raceEvents = resp[0].data;
            });

        };

        vm.loadRefData = function () {

            $log.log("Starting Race Event RefData load.");

            vm.raceFormats = null;
            vm.locations = null;
            vm.activeSeason = null;

            var promiseFormat = refDataService.getRaceFormats();
            var promiseLocations = locationService.get();
            var promiseActiveSeason = seasonService.getActive();

            $scope.combineResult = $q.all([promiseFormat, promiseLocations, promiseActiveSeason]).then(function (resp) {
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
            //do nothing for the moment.
        };

        vm.addRaceEvent = function (toAdd) {

        };

        vm.updateRaceEvent = function (toUpdate) {

        };

    }

}(this.angular));