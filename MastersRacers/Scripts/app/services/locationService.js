(function (ng) {

    'use strict';

    angular
    .module("racerApp")
    .service("locationService", locationService);

    locationService.$inject = ['$http'];
    function locationService($http) {

        var ls = this;

        ls.get = function () {
            var response = $http.get('/locations');
            return response;
        };

        ls.delete = function (id) {
            var response = $http.delete('/location/' + id);
            return response;
        };

        ls.put = function (location) {
            var response = $http.put('/location/' + location.id, location);
            return response;
        };

        ls.post = function (location) {
            var response = $http.post('/location/', location);
            return response;
        }
    }

}(this.angular));