(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .component('seasonDetail', {
            templateUrl: 'Scripts/app/Seasons/seasonDetail.template.html',
            controller: Controller,
            controllerAs: 'sDetail',
            bindings: {
                season: '<',
                onActivate: '&'
            }
        });

    Controller.$inject = ['$log', '$mdDialog', 'CacheService'];
    function Controller($log, $mdDialog, CacheService) {

        var vm = this;

        vm.showSeasons = showSeasons;
        vm.activateTrigger = activateTrigger;

        function showSeasons() {
            $state.go('seasons.list');
        }

        function activateTrigger(event) {

            var confirm = $mdDialog.confirm()
                    .title(mv.modifyAction + ' confirmation')
                    .textContent('Please confirm that you wish to set this season as Active.')
                    .targetEvent(event)
                    .ok('Activate')
                    .cancel('Cancel');

            $mdDialog.show(confirm)
                     .then(activate, function() {/*Nop*/ });

        }

        function activate() {
            $log.log('Activate method called in seasonDetail');
            CacheService.stashItem('Season', mv.season.id);
            vm.onActivate();
        }

    }

}(this.angular));
