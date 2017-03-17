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

    Controller.$inject = ['$log', '$state', 'RacerService', 'CacheService', 'HttpErrorService'];
    function Controller($log, $state, RacerService, CacheService, HttpErrorService) {

        var vm = this;

        var racerToDelete = null;

        vm.loadData = loadData;
        vm.deleteRacer = deleteRacer;
        vm.handleModifyRacer = handleModifyRacer;
        vm.showRacers = showRacers;

        function showRacers() {
            $state.go('racers.list');
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
            if (addedRacer) {
                vm.racers.push(addedRacer);
            }

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

            if (updatedRacer) {
                idx = findIdxById(updatedRacer, vm.racers);
                if (idx !== null) {
                    vm.racers[idx] = updatedRacer;
                } else {
                    $log.log('Could not find updated racer.');
                }
            }

            $state.go('racers', null, {reload: 'racers'});

        }

        function deleteRacer(racer) {

            racerToDelete = racer;
            RacerService.delete(racer.id)
                        .then(afterDeleteRacer, HttpErrorService.onError);

        }

        function afterDeleteRacer(resp) {

            var successful = resp.data;
            if (successful) {
                var idx = vm.racers.indexOf(racerToDelete);
                if (idx >= 0) {
                    vm.racers.splice(idx, 1);
                }
            }

            racerToDelete = null;

        }

        function handleModifyRacer() {

            $log.log('Handle Modify Racer triggered.');

            var changedRacer = CacheService.popItem('Racers');

            $log.log(changedRacer);

            if (!changedRacer.id) {
                addRacer(changedRacer);
            } else {
                updateRacer(changedRacer);
            }

        }

    }

}(this.angular));
