(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("seasonList", {
            templateUrl: 'Scripts/app/templates/seasonList.html',
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

        vm.toggleEditPanel = function(season) {

            if (season !== null) {
                vm.selectedSeason = season;
                vm.editSeasonOpen = true;
            }
            else {
                vm.selectedSeason = null;
                vm.editSeasonOpen = false;
            }

        };

        vm.triggerActivateSeason = function (event) {

            var confirm = $mdDialog.confirm()
                          .title("Are you sure you want to activate this Season?")
                          .textContent("All new races will be added to this season.")
                          .targetEvent(event)
                          .ok("Activate")
                          .cancel("Cancel");
            
            $mdDialog.show(confirm).then(function () {
                vm.activateSeason();
            }, function () { /*nop*/ });

        };

        vm.activateSeason = function () {

            SeasonService.setActive(vm.selectedSeason.id).then(vm.doSeasonActivated, HttpErrorService.onError);

        };

        vm.doSeasonActivated = function (resp) {

            if (resp.data) {
                vm.loadData(vm.selectedSeason.id);
            }

        };

        vm.findById = function (id, seasonList) {

            for (var i = 0; i < seasonList.length; i++) {
                if (seasonList[i].id === id) {
                    return seasonList[i];
                }
            }

            return null;

        };

        vm.loadData = function(id) {

            $log.log("Starting Season Load Data");

            vm.seasons = null;
            vm.selectedId = id;

            SeasonService.get().then(vm.afterDataLoad, HttpErrorService.onError);

        };

        vm.afterDataLoad = function (resp) {

            vm.seasons = resp.data;

            if (vm.selectedId !== null) {
                vm.selectedSeason = null;
                vm.toggleEditPanel(vm.findById(vm.selectedId, vm.seasons));
                vm.selectedId = null;
            }

            $log.log("After Season Data Load finished.");

        };

        //vm.$onInit = vm.loadData;

        vm.triggerCreateSeason = function (event) {

            var confirm = $mdDialog.confirm()
                          .title("Are you sure you want to create a new Season?")
                          .textContent("All new races will be added to this season.")
                          .targetEvent(event)
                          .ok("Create")
                          .cancel("Cancel");

            $mdDialog.show(confirm).then(function () {
                vm.createSeason();
            }, function () { /*nop*/ });

        };

        vm.createSeason = function() {

            SeasonService.create().then(vm.afterCreateSeason, HttpErrorService.onError);

        };

        vm.afterCreateSeason = function (resp) {

            vm.loadData();

        };

    }

}(this.angular));