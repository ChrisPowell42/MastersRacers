(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .component('modifyRacer', {
            templateUrl: 'Scripts/app/Racers/modifyRacer.template.html',
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

    Controller.$inject = ['$log', '$mdDialog', 'CacheService'];
    function Controller($log, $mdDialog, CacheService) {

        var vm = this;

        vm.modifyTrigger = modifyTrigger;

        function modifyTrigger(event) {

            var confirm = $mdDialog.confirm()
                            .title(vm.modifyAction + ' confirmation')
                            .textContent('Please confirm that you wish to ' + vm.modifyAction + ' this racer.')
                            .targetEvent(event)
                            .ok(vm.modifyAction)
                            .cancel('Cancel');

            $mdDialog.show(confirm).then(modify, function() {/*Nop*/ });

        }

        function modify() {

            CacheService.stashItem('Racers', vm.modifyItem);
            vm.onModify();

        }
    }

}(this.angular));
