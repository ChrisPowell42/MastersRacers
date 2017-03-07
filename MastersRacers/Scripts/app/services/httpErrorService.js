(function (angular) {

    'use strict';

    angular
        .module("racerApp")
        .service("HttpErrorService", HttpErrorService);

    HttpErrorService.$inject = ['$log', '$mdToast'];
    function HttpErrorService($log, $mdToast) {

        var es = this;

        es.onError = onError;
        
        function onError(httpError) {

            $log.log(httpError.data);

            var errorToast = $mdToast.simple()
                                     .textContent('Http Error has occured: ' + httpError.status + ' - ' + httpError.statusText + ' (' + httpError.config.url + ')')
                                     .hideDelay(0)
                                     .action('Ok');

            $mdToast.show(errorToast).then(function (response) {
                $mdToast.hide(errorToast);
            });

        }

    }


}(this.angular));