(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .service("SeasonService", SeasonService);

    SeasonService.$inject = ['$http', 'HttpErrorService'];
    function SeasonService($http, HttpErrorService) {

        var ss = this;

        ss.get = function () {
            var response = $http.get('api/seasons');
            return response;
        };

        ss.getResolved = function () {
            return ss.get().then(function (resp) {
                return resp.data;
            }, HttpErrorService.onError);
        };

        ss.create = function () {
            var response = $http.put('api/season/{00000000-0000-0000-0000-000000000000}', null);
            return response;
        };

        ss.getActive = function () {
            var response = $http.get('api/season/active');
            return response;
        };

        ss.getActiveResolved = function () {
            return ss.getActive().then(function (resp) {
                return resp.data;
            }, HttpErrorService.onError);
        };

        ss.setActive = function (id) {
            var response = $http.put('api/season/' + id + '/active', null);
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