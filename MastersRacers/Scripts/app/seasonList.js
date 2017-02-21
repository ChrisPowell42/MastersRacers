(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("seasonList", {
            templateUrl: 'Scripts/app/templates/seasonList.html',
            controller: controller,
            controllerAs: 'sList'
        });

    controller.$inject = ['$scope', '$q', '$log', 'seasonService']
    function controller($scope, $q, $log, seasonService) {

        var vm = this;

        vm.seasons = [];

        vm.editSeasonCollapsed = true;
        vm.seasonToEdit = null;

        vm.cloneSeason = function (season) {
            return {
                id: season.id,
                startYear: season.startYear,
                endYear: season.endYear,
                notes: season.notes
            };
        };

        vm.toggleEditPanel = function (season) {

            if (season != null) {
                $log.log("Season:" + season.startYear);
            }
            else
            {
                $log.log("toggleEditPanel clicked, no season.");
            }

            vm.editSeasonCollapsed = (season == null);
            if (season != null) {
                vm.seasonToEdit = vm.cloneSeason(season);
            }
            else {
                vm.seasonToEdit = null;
            }

        };

        vm.loadData = function () {

            vm.seasons = null;

            var promiseLoc = SeasonService.get();

            $scope.combineResult = $q.all([promiseLoc]).then(function (resp) {
                vm.seasons = resp[0].data;
            });

        };

        vm.$onInit = vm.loadData;

        vm.createSeason = function () {

            var promise = SeasonService.create();

            $scope.combineResult = $q.all([promise]).then(function (resp) {
                var newSeason = resp[0].data;
                vm.seasons.push(newSeason);
            });
        };

    };

}(this.angular));