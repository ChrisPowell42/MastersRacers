(function (ng) {

    'use strict';

    angular
    .module("racerApp")
    .service("RefDataService", RefDataService);

    RefDataService.$inject = ['$http', 'HttpErrorService'];
    function RefDataService($http, HttpErrorService) {

        var rs = this;

        rs.getRaceSeries = function () {
            var response = $http.get('api/refdata/raceseries', { cache: true });
            return response;
        };

        rs.getRaceSeriesResolved = function () {
            return rs.getRaceSeries().then(function (resp) {
                return resp.data;
            }, HttpErrorService.onError);
        };

        rs.getRaceFormats = function () {
            var response = $http.get('api/refdata/raceformats', { cache: true });
            return response;
        };

        rs.getRaceFormatsResolved = function () {
            return rs.getRaceFormats().then(function (resp) {
                return resp.data;
            }, HttpErrorService.onError);
        };

    }

}(this.angular));