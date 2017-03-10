(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .service('LocationService', LocationService);

    LocationService.$inject = ['$http', 'HttpErrorService'];
    function LocationService($http, HttpErrorService) {

        var ls = this;

        ls.get = get;
        ls.getResolved = getResolved;
        ls.delete = deleteLocation;
        ls.put = put;
        ls.post = post;
        ls.newLocation = newLocation;
        ls.cloneLocation = cloneLocation;

        function get() {
            var response = $http.get('api/locations');
            return response;
        }

        function getResolved() {
            return ls.get()
                     .then(function(resp) {
                return resp.data;
            }, HttpErrorService.onError);
        }

        function deleteLocation(id) {
            var response = $http.delete('api/location/' + id);
            return response;
        }

        function put(location) {
            var response = $http.put('api/location/' + location.id, location);
            return response;
        }

        function post(location) {
            var response = $http.post('api/location/', location);
            return response;
        }

        function newLocation() {
            return {
                id: null,
                name: 'New Location',
                description: '',
                latPos: 0.0,
                longPos: 0.0
            };
        }

        function cloneLocation(location) {
            return angular.copy(location);
        }

    }

}(this.angular));
