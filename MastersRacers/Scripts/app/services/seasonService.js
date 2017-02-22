(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .service("seasonService", seasonService);

    seasonService.$inject = ['$http'];
    function seasonService($http) {

        var ss = this;

        ss.get = function () {
            var response = $http.get('/seasons');
            return response;
        };

        ss.create = function () {
            var response = $http.put('/season/{00000000-0000-0000-0000-000000000000}', null);
            return response;
        };

        ss.getActive = function () {
            var response = $http.get('/season/active');
            return response;
        };

        //ss.delete = function (id) {
        //    var response = $http.delete('/location/' + id);
        //    return response;
        //};

        //ss.put = function (location) {
        //    var response = $http.put('/location/' + location.id, location);
        //    return response;
        //};

        //ss.post = function (location) {
        //    var response = $http.post('/location/', location);
        //    return response;
        //}
    }

}(this.angular));