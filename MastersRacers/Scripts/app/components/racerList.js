(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("racerList", {
            templateUrl: 'Scripts/app/templates/racerList.html',
            controller: Controller,
            controllerAs: 'rList',
            bindings: {
                racers: '<',
                raceSeries: '<'
            }
        });

    Controller.$inject = ['$log', 'RacerService', 'RefDataService', 'HttpErrorService'];
    function Controller($log, RacerService, RefDataService, HttpErrorService) {

        var vm = this;

        vm.addRacerCollapsed = true;
        vm.editRacerCollapsed = true;

        vm.racerToEdit = null;
        vm.racerToAdd = null;
        vm.racerToDelete = null;

        vm.toggleAddPanel = function () {

            if (vm.addRacerCollapsed) {
                vm.editRacerCollapsed = true;
                vm.racerToEdit = null;
                vm.racerToAdd = RacerService.newRacer();
            }

            vm.addRacerCollapsed = !vm.addRacerCollapsed;

        };

        vm.toggleEditPanel = function (racer) {

            $log.log("Handling toggleEditPanel.");

            if (vm.editRacerCollapsed && racer !== null) {
                vm.addRacerCollapsed = true;
                vm.racerToAdd = null;
            }

            vm.editRacerCollapsed = (racer === null);
            if (racer !== null) {
                vm.racerToEdit = RacerService.cloneRacer(racer);
            }
        };

        vm.loadData = function () {

            vm.racers = null;

            RacerService.get()
                        .then(vm.afterLoadData, HttpErrorService.onError);

        };

        vm.afterLoadData = function (resp) {

            vm.racers = resp.data;

        };

        vm.loadRefData = function () {

            vm.raceSeries = null;

            RefDataService.getRaceSeries()
                          .then(vm.afterLoadRefData, HttpErrorService.onError);

        };

        vm.afterLoadRefData = function (resp) {

            vm.raceSeries = resp.data;

        };

        //vm.$onInit = function () {

        //    vm.loadData();
        //    vm.loadRefData();

        //};

        vm.addRacer = function (racer) {

            RacerService.post(racer)
                        .then(vm.postAddRacer, HttpErrorService.onError);

        };

        vm.postAddRacer = function (resp) {

            var addedRacer = resp.data;
            if (addedRacer !== null) {
                vm.racers.push(addedRacer);
            }

            vm.addRacerCollapsed = true;
            vm.racerToAdd = null;
        };

        vm.findIdxById = function (racer, racerList) {

            for (var i = 0; i < racerList.length; i++) {
                if (racerList[i].id === racer.id) {
                    return i;
                }
            }

            return null;

        };

        vm.updateRacer = function (racer) {

            RacerService.put(racer)
                        .then(vm.postUpdateRacer, HttpErrorService.onError);

        };

        vm.postUpdateRacer = function (resp) {

            var updatedRacer = resp.data;
            if (updatedRacer !== null) {
                var idx = vm.findIdxById(updatedRacer, vm.racers);
                if (idx !== null) {
                    vm.racers[idx] = updatedRacer;
                    vm.editRacerCollapsed = true;
                }
                else {
                    $log.log("Could not find updated racer.");
                }
            }

        };

        vm.deleteRacer = function (racer) {

            vm.racerToDelete = racer;
            RacerService.delete(racer.id).then(vm.afterDeleteRacer, HttpErrorService.onError);

        };

        vm.afterDeleteRacer = function (resp) {

            var successful = resp.data;
            if (successful) {
                var idx = vm.racers.indexOf(vm.racerToDelete);
                if (idx >= 0) {
                    vm.racers.splice(idx, 1);
                }
            }

            vm.racerToDelete = null;

        };

    }

}(this.angular));