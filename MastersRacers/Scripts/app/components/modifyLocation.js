(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("modifyLocation", {
            templateUrl: 'Scripts/app/templates/modifyLocation.html',
            controller: controller,
            controllerAs: 'mlCtrl',
            bindings: {
                modifyAction: '@',
                modifyItem: '<',
                onModify: '&',
                onCancel: '&'
            }
        });

    controller.$inject = ['$log'];
    function controller($log) {

        var mv = this;

        mv.modifyLocation = mv.modifyItem;

        mv.cancel = function () {
            $log.log("Cancel method called in modifyLocation");
            mv.onCancel();
        };

        mv.modify = function () {
            $log.log("Modify method called in modifyLocation");
            mv.onModify(mv.modifyLocation);
        };

    }

}(this.angular));