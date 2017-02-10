var myApp = angular.module("racerApp");

function locationsController($scope, $q, getLocationsService) {

    var vm = this;

    vm.locations = [];
    
    vm.newLocation = function () {
        return {
            id: null,
            name: '',
            description: '',
            latPos: 0.0,
            longPos: 0.0
        };
    };

    vm.$onInit =  function () {
        var promiseLoc = getLocationsService.get();

        $scope.combineResult = $q.all([promiseLoc]).then(function (resp) {
            vm.locations = resp[0].data;
        });
    }

    vm.addLocation = function (location) {

        
    };

    vm.updateLocation = function (location, prop, value) {
        location[prop] = value;
        //Update
    };

    //vm.deleteLocation = function (location) {

    //    var promise = deleteLocationService.delete(location.id);
    //    var lDelete = false;

    //    $scope.combineResult = $q.all([promise]).then(function (resp) {
    //        lDelete = resp[0].data;
    //    });
        
    //    if (lDelete) {
    //        var idx = $scope.Locations.indexOf(location);
    //        if (idx >= 0) {
    //            $scope.Locations.splice(idx, 1);
    //        }
    //    }
    //};

};

myApp.component("locationList", {
    templateUrl: 'Scripts/app/templates/locationList.html',
    controller: locationsController,
    controllerAs: 'locList'
});

myApp.service("getLocationsService", function ($http) {
    this.get = function () {
        var response = $http.get('/locations');
        return response;
    };
});

//myApp.service("deleteLocationService", function ($http, id) {
//    this.delete = function (id) {
//        var response = $http.delete('/location/' + id);
//        return response;
//    };
//});

//myApp.service("putLocationService", function ($http, location) {
//    this.put = function (location) {
//        var response = $http.put('/location/', location);
//    };
//});