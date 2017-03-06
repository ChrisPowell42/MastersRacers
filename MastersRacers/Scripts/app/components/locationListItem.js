(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("locationListItem", {
            templateUrl: 'Scripts/app/templates/locationListItem.html',
            controller: Controller,
            controllerAs: 'lItem',
            bindings: {
                listItem: '<',
                onEditToggle: '&',
                onDelete: '&'
            }
        });

    Controller.$inject = ['$log', '$mdDialog'];
    function Controller($log, $mdDialog) {

        var vm = this;

        vm.delete = function () {
            vm.onDelete({ location: vm.listItem });
        };

        vm.editToggle = function () {
            vm.onEditToggle({ location: vm.listItem });
        };

        vm.deleteToggle = function (event) {

            var confirm = $mdDialog.confirm()
                            .title('Confirm Deletion')
                            .textContent('Please confirm that you wish to delete this location.')
                            .targetEvent(event)
                            .ok('Delete')
                            .cancel('Cancel');

            $mdDialog.show(confirm).then( vm.delete, function () { /*nop*/});

        };

    }

}(this.angular));