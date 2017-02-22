﻿(function (ng) {

    'use strict';

    angular
    .module("racerApp")
    .service("refDataService", refDataService);

    refDataService.$inject = ['$http'];
    function refDataService($http) {

        var rs = this;

        rs.getRaceSeries = function () {
            var response = $http.get('/refdata/raceseries');
            return response;
        };

        rs.getRaceFormats = function () {
            var response = $http.get('/refdata/raceformats');
            return response;
        };

    };

}(this.angular));