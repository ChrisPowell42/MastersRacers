(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .component('modifyLocation', {
            templateUrl: 'Scripts/app/Locations/modifyLocation.template.html',
            controller: Controller,
            controllerAs: 'mlCtrl',
            bindings: {
                modifyAction: '@',
                modifyItem: '<',
                onModify: '&',
                onCancel: '&'
            }
        });

    Controller.$inject = ['$log', '$mdDialog'];
    function Controller($log, $mdDialog) {

        var mv = this;

        mv.modifyTrigger = modifyTrigger;

        function modifyTrigger(event) {

            var confirm = $mdDialog.confirm()
                            .title(mv.modifyAction + ' confirmation')
                            .textContent('Please confirm that you wish to ' + mv.modifyAction + ' this location.')
                            .targetEvent(event)
                            .ok(mv.modifyAction)
                            .cancel('Cancel');

            $mdDialog.show(confirm)
                     .then(modify, function() {/*Nop*/ });

        }

        function modify() {
            $log.log('Modify method called in modifyLocation');
            mv.onModify(mv.modifyItem);
        }
    }

}(this.angular));
