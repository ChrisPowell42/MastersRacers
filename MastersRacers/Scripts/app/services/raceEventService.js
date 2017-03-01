(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .service("raceEventService", raceEventService);

    raceEventService.$inject = ['$http'];
    function raceEventService($http) {

        var rs = this;

        rs.getActive = function () {
            var response = $http.get('/raceevents/active');
            return response;
        };

        rs.get = function () {
            var response = $http.get('/raceevents');
            return response;
        };

        rs.delete = function (id) {
            var response = $http.delete('/raceevent/'+id);
            return response;
        }

        rs.put = function (raceEvent) {
            var response = $http.put('/raceevent/' + raceEvent.id, raceEvent);
            return response;
        };

        rs.post = function (raceEvent) {
            var response = $http.post('/raceevent/', raceEvent);
            return response;
        }

    }

}(this.angular));