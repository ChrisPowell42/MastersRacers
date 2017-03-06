(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .service("RacerService", RacerService);

    RacerService.$inject = ['$http', 'HttpErrorService'];
    function RacerService($http, HttpErrorService) {

        var rs = this;

        rs.get = function () {
            var response = $http.get('api/racers');
            return response;
        };

        rs.getResolved = function () {
            return rs.get().then(function (resp) {
                return resp.data;
            }, HttpErrorService.onError);
        };

        rs.delete = function (id) {
            var response = $http.delete('api/racer/' + id);
            return response;
        };

        rs.put = function (racer) {
            var response = $http.put('api/racer/' + racer.id, racer);
            return response;
        };

        rs.post = function (racer) {
            var response = $http.post('api/racer/', racer);
            return response;
        };

        rs.newRacer = function () {
            return {
                id: null,
                name: 'New Racer',
                bibNumber: 0,
                active: true,
                raceSeries: null
            };
        };

        rs.cloneRacer = function (racerToClone) {
            return angular.copy(racerToClone);
        };

    }

}(this.angular));