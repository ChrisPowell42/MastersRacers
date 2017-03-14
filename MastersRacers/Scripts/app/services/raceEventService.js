(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .service('RaceEventService', RaceEventService);

    RaceEventService.$inject = ['$log', '$http', 'HttpErrorService'];
    function RaceEventService($log, $http, HttpErrorService) {

        var rs = this;

        rs.getActive = getActive;
        rs.getActiveResolved = getActiveResolved;
        rs.get = get;
        rs.delete = deleteEvent;
        rs.put = put;
        rs.post = post;
        rs.cloneRaceEvent = cloneRaceEvent;
        rs.newRaceEvent = newRaceEvent;

        function getActive() {
            var response = $http.get('api/raceevents/active');
            return response;
        }

        function getActiveResolved() {
            return rs.getActive().then(function(resp) {
                return resp.data;
            }, HttpErrorService.onError);
        }

        function get() {
            var response = $http.get('api/raceevents');
            return response;
        }

        function deleteEvent(id) {
            var response = $http.delete('api/raceevent/' + id);
            return response;
        }

        function put(raceEvent) {
            var response = $http.put('api/raceevent/' + raceEvent.id, raceEvent);
            return response;
        }

        function post(raceEvent) {
            var response = $http.post('api/raceevent/', raceEvent);
            return response;
        }

        function cloneRaceEvent(raceEventToClone) {

            var clone = angular.copy(raceEventToClone);

            clone.startTime = Date.parse(clone.scheduledStartTime);
            $log.log(clone);

            return clone;
        }

        function newRaceEvent(activeSeason) {

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

        }

    }

}(this.angular));
