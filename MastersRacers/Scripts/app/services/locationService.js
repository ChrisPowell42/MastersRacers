(function (ng) {

    'use strict';

    angular
    .module("racerApp")
    .service("LocationService", LocationService);

    LocationService.$inject = ['$http', 'HttpErrorService'];
    function LocationService($http, HttpErrorService) {

        var ls = this;

        ls.get = function () {
            var response = $http.get('api/locations');
            return response;
        };

        ls.getResolved = function () {
            return ls.get().then(function (resp) {
                return resp.data;
            }, HttpErrorService.onError);
        };

        ls.delete = function (id) {
            var response = $http.delete('api/location/' + id);
            return response;
        };

        ls.put = function (location) {
            var response = $http.put('api/location/' + location.id, location);
            return response;
        };

        ls.post = function (location) {
            var response = $http.post('api/location/', location);
            return response;
        };

        ls.newLocation = function () {
            return {
                id: null,
                name: 'New Location',
                description: '',
                latPos: 0.0,
                longPos: 0.0
            };
        };

        ls.cloneLocation = function (location) {
            return angular.copy(location);
        };

    }

}(this.angular));