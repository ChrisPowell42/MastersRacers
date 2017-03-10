(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .component('seasonList', {
            templateUrl: 'Scripts/app/Seasons/seasonList.template.html',
            controller: Controller,
            controllerAs: 'sList',
            bindings: {
                seasons: '<'
            }
        });

    Controller.$inject = ['$log', '$mdDialog', '$state', 'SeasonService', 'CacheService', 'HttpErrorService'];
    function Controller($log, $mdDialog, $state, SeasonService, CacheService, HttpErrorService) {

        var vm = this;

        vm.title = 'Seasons';

        vm.editSeasonOpen = false;
        vm.selectedSeason = null;

        vm.loadData = loadData;
        vm.activateSeason = activateSeason;
        vm.createSeason = createSeason;

        function toggleEditPanel(season) {

            if (season) {
                vm.selectedSeason = season;
                vm.editSeasonOpen = true;
            } else {
                vm.selectedSeason = null;
                vm.editSeasonOpen = false;
            }

        }

        function activateSeason() {

            var selectedId = CacheService.popItem('Seasons');

            SeasonService.setActive(selectedId)
                         .then(doSeasonActivated, HttpErrorService.onError);

        }

        function doSeasonActivated(resp) {

            if (resp.data) {
                $state.go('seasons.list', null, {reload: 'seasons'});
            }

        }

        function findById(id, seasonList) {

            for (var i = 0; i < seasonList.length; i++) {
                if (seasonList[i].id === id) {
                    return seasonList[i];
                }
            }

            return null;

        }

        function loadData() {

            $log.log('Starting Season Load Data');

            vm.seasons = null;

            SeasonService.get()
                         .then(afterDataLoad, HttpErrorService.onError);

        }

        function afterDataLoad(resp) {

            vm.seasons = resp.data;

            $log.log('After Season Data Load finished.');

        }

        function triggerCreateSeason(event) {

            var confirm = $mdDialog.confirm()
                          .title('Are you sure you want to create a new Season?')
                          .textContent('All new races will be added to this season.')
                          .targetEvent(event)
                          .ok('Create')
                          .cancel('Cancel');

            $mdDialog.show(confirm)
                     .then(createSeason, function() { /*nop*/ });

        }

        function createSeason() {

            SeasonService.create()
                         .then(afterCreateSeason, HttpErrorService.onError);

        }

        function afterCreateSeason(resp) {

            loadData();

        }

    }

}(this.angular));
