(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("seasonListItem", {
            templateUrl: 'Scripts/app/templates/seasonListItem.html',
            controller: Controller,
            controllerAs: 'sItem',
            bindings: {
                listItem: '<',
                onEditToggle: '&'
            }
        });

    Controller.$inject = ['$log'];
    function Controller($log) {

        var vm = this;

        vm.editToggle = function () {
            vm.onEditToggle({ season: vm.listItem });
        };

    }

}(this.angular));