var myApp = angular.module("racerApp");

function seasonsController($scope, $q, $log, SeasonService) {

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

myApp.component("seasonList", {
    templateUrl: 'Scripts/app/templates/seasonList.html',
    controller: seasonsController,
    controllerAs: 'sList'
});

function SeasonService($http) {

    var ss = this;

    ss.get = function () {
        var response = $http.get('/seasons');
        return response;
    };

    ss.create = function () {
        var response = $http.put('/season/{00000000-0000-0000-0000-000000000000}', null);
        return response;
    }

    //ss.delete = function (id) {
    //    var response = $http.delete('/location/' + id);
    //    return response;
    //};

    //ss.put = function (location) {
    //    var response = $http.put('/location/' + location.id, location);
    //    return response;
    //};

    //ss.post = function (location) {
    //    var response = $http.post('/location/', location);
    //    return response;
    //}
}

myApp.service("SeasonService", SeasonService);