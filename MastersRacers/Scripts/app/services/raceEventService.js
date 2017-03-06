(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .service("RaceEventService", RaceEventService);

    RaceEventService.$inject = ['$http', 'HttpErrorService'];
    function RaceEventService($http, HttpErrorService) {

        var rs = this;

        rs.getActive = function () {
            var response = $http.get('api/raceevents/active');
            return response;
        };

        rs.getActiveResolved = function () {
            return rs.getActive().then(function (resp) {
                return resp.data;
            }, HttpErrorService.onError);
        };

        rs.get = function () {
            var response = $http.get('api/raceevents');
            return response;
        };

        rs.delete = function (id) {
            var response = $http.delete('api/raceevent/' + id);
            return response;
        };

        rs.put = function (raceEvent) {
            var response = $http.put('api/raceevent/' + raceEvent.id, raceEvent);
            return response;
        };

        rs.post = function (raceEvent) {
            var response = $http.post('api/raceevent/', raceEvent);
            return response;
        };

        rs.cloneRaceEvent = function (raceEventToClone) {

            return angular.copy(raceEventToClone);

        };

        rs.newRaceEvent = function (activeSeason) {

            return {
                id: null,
                location: null,
                season: activeSeason,
                raceFormat: null,
                runCount: 2,
                raceName: '',
                scheduledStartTime: new Date(),
                notes: ''
            };

        };

    }

}(this.angular));