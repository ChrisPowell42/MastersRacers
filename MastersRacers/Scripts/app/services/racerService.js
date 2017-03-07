(function (angular) {

    'use strict';

    angular
        .module("racerApp")
        .service("RacerService", RacerService);

    RacerService.$inject = ['$http', 'HttpErrorService'];
    function RacerService($http, HttpErrorService) {

        var rs = this;

        rs.get = get;
        rs.getResolved = getResolved;
        rs.delete = deleteRacer;
        rs.put = put;
        rs.post = post;
        rs.newRacer = newRacer;
        rs.cloneRacer = cloneRacer;

        function get() {
            var response = $http.get('api/racers');
            return response;
        }

        function getResolved() {
            return rs.get().then(function (resp) {
                return resp.data;
            }, HttpErrorService.onError);
        }

        function deleteRacer(id) {
            var response = $http.delete('api/racer/' + id);
            return response;
        }

        function put(racer) {
            var response = $http.put('api/racer/' + racer.id, racer);
            return response;
        }

        function post(racer) {
            var response = $http.post('api/racer/', racer);
            return response;
        }

        function newRacer() {
            return {
                id: null,
                name: 'New Racer',
                bibNumber: 0,
                active: true,
                raceSeries: null
            };
        }

        function cloneRacer(racerToClone) {
            return angular.copy(racerToClone);
        }

    }

}(this.angular));