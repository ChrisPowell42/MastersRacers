(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("racerListItem", {
            templateUrl: 'Scripts/app/templates/racerListItem.html',
            controller: controller,
            controllerAs: 'rItem',
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
            vm.onDelete({ racer: vm.listItem });
        };

        vm.editToggle = function () {
            vm.onEditToggle({ racer: vm.listItem });
        }

    };

}(this.angular));