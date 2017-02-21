(function (ng) {

    'use strict';

    angular
    .module("racerApp")
    .component("raceEventListItem", {
        templateUrl: 'Scripts/app/templates/raceEventListItem.html',
        controller: controller,
        controllerAs: 'reItem',
        bindings: {
            listItem: '<',
            onEditToggle: '&',
            onDelete: '&'
        }
    });

    controller.$inject = ['$log'];
    function controller($log) {

        var vm = this;

        vm.delete = function () {
            vm.onDelete({ race: vm.listItem });
        };

        vm.editToggle = function () {
            vm.onEditToggle({ race: vm.listItem });
        }

    };

}(this.angular));