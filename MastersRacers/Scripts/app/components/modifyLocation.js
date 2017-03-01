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

    controller.$inject = ['$log', '$mdDialog'];
    function controller($log, $mdDialog) {

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

        mv.modifyTrigger = function (event) {

            var confirm = $mdDialog.confirm()
                            .title(mv.modifyAction+' confirmation')
                            .textContent('Please confirm that you wish to '+mv.modifyAction+' this location.')
                            .targetEvent(event)
                            .ok(mv.modifyAction)
                            .cancel('Cancel');

            $mdDialog.show(confirm).then(mv.modify, function () {/*Nop*/ });

        };

    }

}(this.angular));