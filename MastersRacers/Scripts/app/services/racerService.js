(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .service("racerService", racerService);

    racerService.$inject = ['$http'];
    function racerService($http) {

        var rs = this;

        rs.get = function () {
            var response = $http.get('/racers');
            return response;
        };

        rs.delete = function (id) {
            var response = $http.delete('/racer/' + id);
            return response;
        };

        rs.put = function (racer) {
            var response = $http.put('/racer/' + racer.id, racer);
            return response;
        };

        rs.post = function (racer) {
            var response = $http.post('/racer/', racer);
            return response;
        };

    };

}(this.angular));