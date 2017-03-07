(function (angular) {

    'use strict';

    angular
        .module("racerApp")
        .component("locationListItem", {
            templateUrl: 'Scripts/app/Locations/locationListItem.template.html',
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

        vm.deleteToggle = deleteToggle;

        function deleteToggle(event) {

            var confirm = $mdDialog.confirm()
                            .title('Confirm Deletion')
                            .textContent('Please confirm that you wish to delete this location.')
                            .targetEvent(event)
                            .ok('Delete')
                            .cancel('Cancel');

            $mdDialog.show(confirm).then( deleteItem, function () { /*nop*/});

        }

        function deleteItem() {
            vm.onDelete({ location: vm.listItem });
        }

    }

}(this.angular));