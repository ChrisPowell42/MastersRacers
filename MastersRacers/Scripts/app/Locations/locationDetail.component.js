(function (angular) {

    'use strict';

    angular
        .module("racerApp")
        .component("locationDetail", {
            templateUrl: 'Scripts/app/Locations/locationDetail.template.html',
            controller: Controller,
            controllerAs: 'lDetail',
            bindings: {
                location: '<'
            }
        });

    function Controller() {

        var vm = this;


    }

}(this.angular));