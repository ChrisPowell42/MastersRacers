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

    Controller.$inject = ['$log', '$mdDialog', 'CacheService'];
    function Controller($log, $mdDialog, CacheService) {

        var vm = this;

        vm.modifyTrigger = modifyTrigger;

        function modifyTrigger(event) {

            //$log.log(mv.modifyItem);

            var confirm = $mdDialog.confirm()
                            .title(vm.modifyAction + ' confirmation')
                            .textContent('Please confirm that you wish to ' + vm.modifyAction + ' this race event.')
                            .targetEvent(event)
                            .ok(vm.modifyAction)
                            .cancel('Cancel');

            $mdDialog.show(confirm)
                     .then(modify, function() {/*Nop*/ });

        }

        function modify() {

            CacheService.stashItem('Races', vm.modifyItem);
            vm.onModify();
        }
    }

}(this.angular));
