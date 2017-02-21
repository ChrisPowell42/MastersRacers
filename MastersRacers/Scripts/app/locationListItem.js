(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("locationListItem", {
            templateUrl: 'Scripts/app/templates/locationListItem.html',
            controller: controller,
            controllerAs: 'lItem',
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
            vm.onDelete({ location: vm.listItem });
        };

        vm.editToggle = function () {
            vm.onEditToggle({ location: vm.listItem });
        }

    };

}(this.angular));