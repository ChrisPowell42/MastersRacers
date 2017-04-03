(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .component('raceTimeEntry', {
            templateUrl: 'Scripts/app/RaceResults/raceTimeEntry.template.html',
            controller: Controller,
            controllerAs: 'rtCtrl',
            bindings: {
                raceTime: '<'
            }
        });

    Controller.$inject = ['$log'];
    function Controller($log) {

        var vm = this;

    }

}(this.angular));
