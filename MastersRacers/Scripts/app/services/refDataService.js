(function (angular) {

    'use strict';

    angular
        .module("racerApp")
        .service("RefDataService", RefDataService);

    RefDataService.$inject = ['$http', 'HttpErrorService'];
    function RefDataService($http, HttpErrorService) {

        var rs = this;

        rs.getRaceSeries = getRaceSeries;
        rs.getRaceSeriesResolved = getRaceSeriesResolved;
        rs.getRaceFormats = getRaceFormats;
        rs.getRaceFormatsResolved = getRaceFormatsResolved;

        function getRaceSeries() {
            var response = $http.get('api/refdata/raceseries', { cache: true });
            return response;
        }

        function getRaceSeriesResolved() {
            return rs.getRaceSeries().then(function (resp) {
                return resp.data;
            }, HttpErrorService.onError);
        }

        function getRaceFormats() {
            var response = $http.get('api/refdata/raceformats', { cache: true });
            return response;
        }

        function getRaceFormatsResolved() {
            return rs.getRaceFormats().then(function (resp) {
                return resp.data;
            }, HttpErrorService.onError);
        }

    }

}(this.angular));