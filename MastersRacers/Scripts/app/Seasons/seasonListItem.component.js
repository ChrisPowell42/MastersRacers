(function (angular) {

    'use strict';

    angular
        .module("racerApp")
        .component("seasonListItem", {
            templateUrl: 'Scripts/app/Seasons/seasonListItem.template.html',
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

        vm.editToggle = editToggle;

        function editToggle() {
            vm.onEditToggle({ season: vm.listItem });
        }

    }

}(this.angular));