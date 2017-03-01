(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("seasonList", {
            templateUrl: 'Scripts/app/templates/seasonList.html',
            controller: controller,
            controllerAs: 'sList'
        });

    controller.$inject = ['$log', '$mdDialog', '$mdToast', 'seasonService']
    function controller( $log, $mdDialog, $mdToast, seasonService) {

        var vm = this;

        vm.title = "Seasons";
        vm.seasons = [];

        vm.editSeasonOpen = false;
        vm.selectedSeason = null;
        vm.selectedId = null;


        vm.toggleEditPanel = function(season) {

            if (season != null) {
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

        vm.onError = function (httpError) {

            $log.log(httpError.data);

            var errorToast = $mdToast.simple()
                                     .textContent('Season Error has occured: ' + httpError.status + ' - ' + httpError.statusText + ' (' + httpError.config.url + ')')
                                     .hideDelay(0)
                                     .action('Ok');

            $mdToast.show(errorToast).then(function (response) {
                $mdToast.hide(errorToast);
            });

        };

        vm.activateSeason = function () {

            seasonService.setActive(vm.selectedSeason.id).then(vm.doSeasonActivated, vm.onError);

        };

        vm.doSeasonActivated = function (resp) {

            if (resp.data) {
                vm.loadData(vm.selectedSeason.id);
            };

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

            seasonService.get().then(vm.afterDataLoad, vm.onError);

        };

        vm.afterDataLoad = function (resp) {

            vm.seasons = resp.data;

            if (vm.selectedId != null) {
                vm.selectedSeason = null;
                vm.toggleEditPanel(vm.findById(vm.selectedId, vm.seasons));
                vm.selectedId = null;
            }

            $log.log("After Season Data Load finished.");

        };

        vm.$onInit = vm.loadData;

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

            seasonService.create().then(vm.afterCreateSeason, vm.onError);

        };

        vm.afterCreateSeason = function (resp) {

            vm.loadData();

        };

    };

}(this.angular));