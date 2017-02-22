(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("modifyRacer", {
            templateUrl: 'Scripts/app/templates/modifyRacer.html',
            controller: controller,
            controllerAs: 'mrCtrl',
            bindings: {
                modifyAction: '@',
                modifyItem: '<',
                raceSeriesList: '<',
                onModify: '&',
                onCancel: '&'
            }
        });

    controller.$inject = ['$log'];
    function controller($log) {

        var mv = this;

        mv.modifyRacer = mv.modifyItem;

        mv.cancel = function () {
            mv.onCancel();
        };

        mv.modify = function () {
            mv.onModify(mv.modifyRacer);
        };

    }

}(this.angular));