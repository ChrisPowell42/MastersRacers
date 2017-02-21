(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("seasonListItem", {
            templateUrl: 'Scripts/app/templates/seasonListItem.html',
            controller: controller,
            controllerAs: 'sItem',
            bindings: {
                listItem: '<',
                onEditToggle: '&'
            }
        });

    controller.$inject = ['$log'];
    function controller($log) {

        var vm = this;

        vm.editToggle = function () {
            vm.onEditToggle({ season: vm.listItem });
        }

    };

}(this.angular));