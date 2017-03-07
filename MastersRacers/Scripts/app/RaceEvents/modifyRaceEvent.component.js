(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .component('modifyRaceEvent', {
            templateUrl: 'Scripts/app/RaceEvents/modifyRaceEvent.template.html',
            controller: Controller,
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

    Controller.$inject = ['$log', '$mdDialog'];
    function Controller($log, $mdDialog) {

        var mv = this;

        mv.modifyTrigger = modifyTrigger;

        function modifyTrigger(event) {

            //$log.log(mv.modifyItem);

            var confirm = $mdDialog.confirm()
                            .title(mv.modifyAction + ' confirmation')
                            .textContent('Please confirm that you wish to ' + mv.modifyAction + ' this race event.')
                            .targetEvent(event)
                            .ok(mv.modifyAction)
                            .cancel('Cancel');

            $mdDialog.show(confirm)
                     .then(modify, function() {/*Nop*/ });

        }

        function modify() {
            mv.onModify(mv.modifyItem);
        }
    }

}(this.angular));
