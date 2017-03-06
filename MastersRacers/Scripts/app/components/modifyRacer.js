(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("modifyRacer", {
            templateUrl: 'Scripts/app/templates/modifyRacer.html',
            controller: Controller,
            controllerAs: 'mrCtrl',
            bindings: {
                modifyAction: '@',
                modifyItem: '<',
                raceSeriesList: '<',
                onModify: '&',
                onCancel: '&'
            }
        });

    Controller.$inject = ['$log', '$mdDialog'];
    function Controller($log, $mdDialog) {

        var mv = this;

        mv.modifyRacer = mv.modifyItem;

        mv.cancel = function () {
            mv.onCancel();
        };

        mv.modify = function () {
            mv.onModify(mv.modifyRacer);
        };

        mv.modifyTrigger = function (event) {

            var confirm = $mdDialog.confirm()
                            .title(mv.modifyAction + ' confirmation')
                            .textContent('Please confirm that you wish to ' + mv.modifyAction + ' this racer.')
                            .targetEvent(event)
                            .ok(mv.modifyAction)
                            .cancel('Cancel');

            $mdDialog.show(confirm).then(mv.modify, function () {/*Nop*/ });

        };

    }

}(this.angular));