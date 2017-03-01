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

    controller.$inject = ['$log', '$mdDialog'];
    function controller($log, $mdDialog) {

        var mv = this;

        mv.cancel = function () {
            mv.onCancel();
        };

        mv.modify = function () {
            mv.onModify(mv.modifyItem);
        };

        mv.modifyTrigger = function (event) {

            //$log.log(mv.modifyItem);

            var confirm = $mdDialog.confirm()
                            .title(mv.modifyAction + ' confirmation')
                            .textContent('Please confirm that you wish to ' + mv.modifyAction + ' this race event.')
                            .targetEvent(event)
                            .ok(mv.modifyAction)
                            .cancel('Cancel');

            $mdDialog.show(confirm).then(mv.modify, function () {/*Nop*/ });

        };

    }

}(this.angular));