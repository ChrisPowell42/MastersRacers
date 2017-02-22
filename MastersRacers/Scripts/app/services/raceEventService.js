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

    }

}(this.angular));