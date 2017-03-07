(function (angular) {

    'use strict';

    angular
        .module("racerApp")
        .component("seasonList", {
            templateUrl: 'Scripts/app/Seasons/seasonList.template.html',
            controller: Controller,
            controllerAs: 'sList',
            bindings: {
                seasons: '<'
            }
        });

    Controller.$inject = ['$log', '$mdDialog', 'SeasonService', 'HttpErrorService'];
    function Controller( $log, $mdDialog, SeasonService, HttpErrorService) {

        var vm = this;

        vm.title = "Seasons";

        vm.editSeasonOpen = false;
        vm.selectedSeason = null;
        vm.selectedId = null;

        vm.loadData = loadData;
        vm.toggleEditPanel = toggleEditPanel;
        vm.triggerActivateSeason = triggerActivateSeason;
        vm.activateSeason = activateSeason;
        vm.triggerCreateSeason = triggerCreateSeason;
        vm.createSeason = createSeason;

        function toggleEditPanel(season) {

            if (season !== null) {
                vm.selectedSeason = season;
                vm.editSeasonOpen = true;
            }
            else {
                vm.selectedSeason = null;
                vm.editSeasonOpen = false;
            }

        }

        function triggerActivateSeason(event) {

            var confirm = $mdDialog.confirm()
                          .title("Are you sure you want to activate this Season?")
                          .textContent("All new races will be added to this season.")
                          .targetEvent(event)
                          .ok("Activate")
                          .cancel("Cancel");
            
            $mdDialog.show(confirm).then(activateSeason, function () { /*nop*/ });

        }

        function activateSeason() {

            SeasonService.setActive(vm.selectedSeason.id)
                         .then(doSeasonActivated, HttpErrorService.onError);

        }

        function doSeasonActivated(resp) {

            if (resp.data) {
                loadData(vm.selectedSeason.id);
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

        function loadData(id) {

            $log.log("Starting Season Load Data");

            vm.seasons = null;
            vm.selectedId = id;

            SeasonService.get()
                         .then(afterDataLoad, HttpErrorService.onError);

        }

        function afterDataLoad(resp) {

            vm.seasons = resp.data;

            if (vm.selectedId !== null) {
                vm.selectedSeason = null;
                vm.toggleEditPanel(findById(vm.selectedId, vm.seasons));
                vm.selectedId = null;
            }

            $log.log("After Season Data Load finished.");

        }

        //vm.$onInit = vm.loadData;

        function triggerCreateSeason(event) {

            var confirm = $mdDialog.confirm()
                          .title("Are you sure you want to create a new Season?")
                          .textContent("All new races will be added to this season.")
                          .targetEvent(event)
                          .ok("Create")
                          .cancel("Cancel");

            $mdDialog.show(confirm)
                     .then(createSeason, function () { /*nop*/ });

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