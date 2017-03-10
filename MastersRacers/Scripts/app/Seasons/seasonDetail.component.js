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

    Controller.$inject = ['$log', '$state', '$mdDialog', 'CacheService'];
    function Controller($log, $state, $mdDialog, CacheService) {

        var vm = this;

        vm.showSeasons = showSeasons;
        vm.activateTrigger = activateTrigger;

        function showSeasons() {
            $state.go('seasons.list');
        }

        function activateTrigger(event) {

            var confirm = $mdDialog.confirm()
                    .title('Activate confirmation')
                    .textContent('Please confirm that you wish to set this season as Active.')
                    .targetEvent(event)
                    .ok('Activate')
                    .cancel('Cancel');

            $mdDialog.show(confirm)
                     .then(activate, function() {/*Nop*/ });

        }

        function activate() {

            CacheService.stashItem('Seasons', vm.season.id);
            vm.onActivate();

        }

    }

}(this.angular));
