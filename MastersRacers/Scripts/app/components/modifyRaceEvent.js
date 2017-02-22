(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("modifyRaceEvent", {
            templateUrl: 'Scripts/app/templates/modifyRaceEvent.html',
            controller: controller,
            controllerAs: 'mreCtrl',
            bindings: {
                modifyAction: '@',
                modifyItem: '<',
                locationList: '<',
                formatList: '<',
                onModify: '&',
                onCancel: '&'
            }
        });

    controller.$inject = ['$log'];
    function controller($log) {

        var mv = this;

        mv.cancel = function () {
            mv.onCancel();
        };

        mv.modify = function () {
            mv.onModify(mv.modifyRacer);
        };

    }

}(this.angular));