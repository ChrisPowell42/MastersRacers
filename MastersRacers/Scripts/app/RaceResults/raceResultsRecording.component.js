(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .component('raceEventRecording', {
            templateUrl: 'Scripts/app/RaceEvents/raceEventRecording.template.html',
            controller: Controller,
            controllerAs: 'rCtrl',
            bindings: {
                raceItem: '<',
                raceResults: '<'
            }
        });

    Controller.$inject = ['$log'];
    function Controller($log) {

        var vm = this;

    }

}(this.angular));
