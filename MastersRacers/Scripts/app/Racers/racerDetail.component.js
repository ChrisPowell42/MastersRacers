(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .component('racerDetail', {
            templateUrl: 'Scripts/app/Racers/racerDetail.template.html',
            controller: Controller,
            controllerAs: 'rdCtrl',
            bindings: {
                detailItem: '<',
            }
        });

    function Controller() {

        var vm = this;

    }

}(this.angular));
