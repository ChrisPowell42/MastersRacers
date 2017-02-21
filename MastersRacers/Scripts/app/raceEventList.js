(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("raceEventList", {
            templateUrl: 'Scripts/app/templates/raceEventList.html',
            controller: controller,
            controllerAs: 'reList'
        });

    controller.$inject = ['$scope', '$log', '$q', 'raceEventService'];
    function controller($scope, $log, $q, raceEventService) {

        var vm = this;

        vm.raceEvents = [];
        vm.raceFormats = [];

        vm.locations = [];
        vm.activeSeason = {};

        vm.addRaceEventCollapsed = true;
        vm.editRaceEventCollapsed = true;

        vm.loadActiveData = function () {

            vm.raceEvents = null;

            var promise = raceEventService.getActive();

            $scope.combineResult = $q.all([promise]).then(function (resp) {
                vm.raceEvents = resp[0].data;
            });

        };

        vm.loadRefData = function () {

            vm.raceFormats = null;

            var promise = raceEventService.getRaceFormats();

            $scope.combineResult = $q.all([promise]).then(function (resp) {
                vm.raceFormats = resp[0].data;
            });

        };

        vm.$onInit = function () {

            vm.loadRefData();
            vm.loadActiveData();

        }

        vm.toggleAddPanel = function () {

            vm.addRaceEventCollapsed = !vm.addRaceEventCollapsed;
            vm.editRaceEventCollapsed = !vm.addRaceEventCollapsed;

        };

        vm.toggleEditPanel = function () {

            vm.editRaceEventCollapsed = !vm.editRaceEventCollapsed;
            vm.addRaceEventCollapsed = !vm.editRaceEventCollapsed;

        };

        vm.deleteRaceEvent = function (race) {
            //do nothing for the moment.
        }

    }

}(this.angular));