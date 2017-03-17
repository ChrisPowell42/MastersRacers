(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .service('RefDataService', RefDataService);

    RefDataService.$inject = ['$log', '$http', 'HttpErrorService'];
    function RefDataService($log, $http, HttpErrorService) {

        var rs = this;

        rs.getRaceSeries = getRaceSeries;
        rs.getRaceSeriesResolved = getRaceSeriesResolved;
        rs.getRaceFormats = getRaceFormats;
        rs.getRaceFormatsResolved = getRaceFormatsResolved;
        rs.getRacePhases = getRacePhases;
        rs.getRacePhasesResolved = getRacePhasesResolved;

        function getRaceSeries() {
            var response = $http.get('api/refdata/raceseries', {cache: true});
            return response;
        }

        function getRaceSeriesResolved() {
            return getRaceSeries().then(function(resp) {
                return resp.data;
            }, HttpErrorService.onError);
        }

        function getRaceFormats() {
            var response = $http.get('api/refdata/raceformats', {cache: true});
            return response;
        }

        function getRaceFormatsResolved() {
            return getRaceFormats().then(function(resp) {
                return resp.data;
            }, HttpErrorService.onError);
        }

        function getRacePhases() {
            var response = $http.get('api/refdata/racephases', {cache: true});
            return response;
        }

        function getRacePhasesResolved() {
            return getRacePhases().then(function(resp) {
                return resp.data;
            }, HttpErrorService.onError);
        }

    }

}(this.angular));
