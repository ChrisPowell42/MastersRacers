(function (angular) {

    'use strict';

    angular
        .module("racerApp")
        .service("SeasonService", SeasonService);

    SeasonService.$inject = ['$http', 'HttpErrorService'];
    function SeasonService($http, HttpErrorService) {

        var ss = this;

        ss.get = get;
        ss.getResolved = getResolved;
        ss.create = create;
        ss.getActive = getActive;
        ss.getActiveResolved = getActiveResolved;
        ss.setActive = setActive;

        function get() {
            var response = $http.get('api/seasons');
            return response;
        }

        function getResolved() {
            return ss.get().then(function (resp) {
                return resp.data;
            }, HttpErrorService.onError);
        }
        
        function create() {
            var response = $http.put('api/season/{00000000-0000-0000-0000-000000000000}', null);
            return response;
        }

        function getActive() {
            var response = $http.get('api/season/active');
            return response;
        }

        function getActiveResolved() {
            return ss.getActive().then(function (resp) {
                return resp.data;
            }, HttpErrorService.onError);
        }

        function setActive(id) {
            var response = $http.put('api/season/' + id + '/active', null);
            return response;
        }

    }

}(this.angular));