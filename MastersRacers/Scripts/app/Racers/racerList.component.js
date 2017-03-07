(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .component('racerList', {
            templateUrl: 'Scripts/app/Racers/racerList.template.html',
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

        vm.toggleAddPanel = toggleAddPanel;
        vm.toggleEditPanel = toggleEditPanel;
        vm.loadData = loadData;
        vm.addRacer = addRacer;
        vm.updateRacer = updateRacer;
        vm.deleteRacer = deleteRacer;

        function toggleAddPanel() {

            if (vm.addRacerCollapsed) {
                vm.editRacerCollapsed = true;
                vm.racerToEdit = null;
                vm.racerToAdd = RacerService.newRacer();
            }

            vm.addRacerCollapsed = !vm.addRacerCollapsed;

        }

        function toggleEditPanel(racer) {

            $log.log('Handling toggleEditPanel.');

            if (vm.editRacerCollapsed && racer !== null) {
                vm.addRacerCollapsed = true;
                vm.racerToAdd = null;
            }

            vm.editRacerCollapsed = (racer === null);
            if (racer !== null) {
                vm.racerToEdit = RacerService.cloneRacer(racer);
            }
        }

        function loadData() {

            vm.racers = null;

            RacerService.get()
                        .then(afterLoadData, HttpErrorService.onError);

        }

        function afterLoadData(resp) {

            vm.racers = resp.data;

        }

        function addRacer(racer) {

            RacerService.post(racer)
                        .then(postAddRacer, HttpErrorService.onError);

        }

        function postAddRacer(resp) {

            var addedRacer = resp.data;
            if (addedRacer !== null) {
                vm.racers.push(addedRacer);
            }

            vm.addRacerCollapsed = true;
            vm.racerToAdd = null;
        }

        function findIdxById(racer, racerList) {

            for (var i = 0; i < racerList.length; i++) {
                if (racerList[i].id === racer.id) {
                    return i;
                }
            }

            return null;

        }

        function updateRacer(racer) {

            RacerService.put(racer)
                        .then(postUpdateRacer, HttpErrorService.onError);

        }

        function postUpdateRacer(resp) {

            var updatedRacer, idx;

            updatedRacer = resp.data;
            if (updatedRacer !== null) {
                idx = findIdxById(updatedRacer, vm.racers);
                if (idx !== null) {
                    vm.racers[idx] = updatedRacer;
                    vm.editRacerCollapsed = true;
                } else {
                    $log.log('Could not find updated racer.');
                }
            }

        }

        function deleteRacer(racer) {

            vm.racerToDelete = racer;
            RacerService.delete(racer.id)
                        .then(afterDeleteRacer, HttpErrorService.onError);

        }

        function afterDeleteRacer(resp) {

            var successful = resp.data;
            if (successful) {
                var idx = vm.racers.indexOf(vm.racerToDelete);
                if (idx >= 0) {
                    vm.racers.splice(idx, 1);
                }
            }

            vm.racerToDelete = null;

        }

    }

}(this.angular));
