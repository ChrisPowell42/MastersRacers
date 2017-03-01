(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("racerList", {
            templateUrl: 'Scripts/app/templates/racerList.html',
            controller: controller,
            controllerAs: 'rList'
        })

    controller.$inject = ['$scope', '$log', '$q', '$mdToast', 'racerService', 'refDataService'];
    function controller($scope, $log, $q, $mdToast, racerService, refDataService) {

        var vm = this;

        vm.racers = [];
        vm.raceSeries = [];

        vm.addRacerCollapsed = true;
        vm.editRacerCollapsed = true;

        vm.racerToEdit = null;
        vm.racerToAdd = null;
        vm.racerToDelete = null;

        vm.newRacer = function () {
            return {
                id: null,
                name: 'New Racer',
                bibNumber: 0,
                active: true,
                raceSeries: null
            };
        };

        vm.cloneRacer = function (racerToClone) {
            return {
                id: racerToClone.id,
                name: racerToClone.name,
                bibNumber: racerToClone.bibNumber,
                active: racerToClone.active,
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

            $log.log("Handling toggleEditPanel.");

            if (vm.editRacerCollapsed && racer != null) {
                vm.addRacerCollapsed = true;
                vm.racerToAdd = null;
            }

            vm.editRacerCollapsed = (racer == null);
            if (racer != null) {
                vm.racerToEdit = vm.cloneRacer(racer);
            }
        };

        vm.onError = function (httpError) {

            $log.log(httpError.data);

            var errorToast = $mdToast.simple()
                                     .textContent('Racer Error has occured: ' + httpError.status + ' - ' + httpError.statusText + ' (' + httpError.config.url + ')')
                                     .hideDelay(0)
                                     .action('Ok');

            $mdToast.show(errorToast).then(function (response) {
                $mdToast.hide(errorToast);
                vm.racerToDelete = null;
            });

        };

        vm.loadData = function () {

            vm.racers = null;

            racerService.get().then(vm.afterLoadData, vm.onError);

        }

        vm.afterLoadData = function (resp) {

            vm.racers = resp.data;

        };

        vm.loadRefData = function () {

            vm.raceSeries = null;

            refDataService.getRaceSeries().then(vm.afterLoadRefData, vm.onError);

        }

        vm.afterLoadRefData = function (resp) {

            vm.raceSeries = resp.data;

        };

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

            vm.racerToDelete = racer;
            racerService.delete(racer.id).then(vm.afterDeleteRacer, vm.onError);

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

    };

}(this.angular));