(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("racersList", {
            templateUrl: 'Scripts/app/templates/racersList.html',
            controller: controller,
            controllerAs: 'rList'
        })

    controller.$inject = ['$scope', '$log', '$q', 'racerService', 'refDataService'];
    function controller($scope, $log, $q, racerService, refDataService) {

        var vm = this;

        vm.racers = [];
        vm.raceSeries = [];

        vm.addRacerCollapsed = true;
        vm.editRacerCollapsed = true;

        vm.racerToEdit = null;
        vm.racerToAdd = null;

        vm.newRacer = function () {
            return {
                id: null,
                name: 'New Racer',
                bibNumber: 0,
                raceSeries: null
            };
        };

        vm.cloneRacer = function (racerToClone) {
            return {
                id: racerToClone.id,
                name: racerToClone.name,
                bibNumber: racerToClone.bibNumber,
                raceSeries: racerToClone.raceSeries
            };
        }

        vm.toggleAddPanel = function () {

            if (vm.addRacerCollapsed) {
                vm.editRacerCollapsed = true;
                vm.racerToEdit = null;
                vm.racerToAdd = vm.newRacer();
            }

            vm.addRacerCollapsed = !vm.addRacerCollapsed;

        };

        vm.toggleEditPanel = function (racer) {

            if (vm.editRacerCollapsed && racer != null) {
                vm.addRacerCollapsed = true;
                vm.racerToAdd = null;
            }

            vm.editRacerCollapsed = (racer == null);
            if (racer != null) {
                vm.racerToEdit = vm.cloneRacer(racer);
            }
        };

        vm.loadData = function () {

            vm.racers = null;

            var promiseRacer = racerService.get();

            $scope.combineResult = $q.all([promiseRacer]).then(function (resp) {
                vm.racers = resp[0].data;
            });

        }

        vm.loadRefData = function () {

            vm.raceSeries = null;

            var promise = refDataService.getRaceSeries();

            $scope.combineResult = $q.all([promise]).then(function (resp) {
                vm.raceSeries = resp[0].data;
            });
        }

        vm.$onInit = function () {

            vm.loadData();
            vm.loadRefData();

        }

        vm.addRacer = function (racer) {

            var promise = racerService.post(racer);
            var addedRacer = null;

            $scope.combineResult = $q.all([promise]).then(function (resp) {

                addedRacer = resp[0].data;
                if (addedRacer != null) {
                    vm.racers.push(addedRacer);
                }

                vm.addRacerCollapsed = true;
                vm.racerToAdd = null;

            });

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

            var promise = racerService.put(racer);
            var updatedRacer = null;

            $scope.combineResult = $q.all([promise]).then(function (resp) {

                updatedRacer = resp[0].data;
                if (updatedRacer != null) {
                    var idx = vm.findIdxById(updatedRacer, vm.racers);
                    if (idx != null) {
                        vm.racers[idx] = updatedRacer;
                        vm.editRacerCollapsed = true;
                    }
                    else {
                        $log.log("Could not find updated racer.");
                    }
                }

            });

        };

        vm.deleteRacer = function (racer) {

            //This probably isn't best practice.  Will fix up later.
            var proceed = confirm("Delete racer " + racer.name + " ?");

            if (proceed) {

                var promise = racerService.delete(racer.id);
                var successful = false;

                $scope.combineResult = $q.all([promise]).then(function (resp) {
                    successful = resp[0].data;
                    if (successful) {
                        var idx = vm.racers.indexOf(racer);
                        if (idx >= 0) {
                            vm.racers.splice(idx, 1);
                        }
                    };
                });
            };

        };

    };

}(this.angular));