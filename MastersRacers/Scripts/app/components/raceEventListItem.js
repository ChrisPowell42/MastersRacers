(function (ng) {

    'use strict';

    angular
    .module("racerApp")
    .component("raceEventListItem", {
        templateUrl: 'Scripts/app/templates/raceEventListItem.html',
        controller: Controller,
        controllerAs: 'reItem',
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
            vm.onDelete({ race: vm.listItem });
        };

        vm.editToggle = function () {
            vm.onEditToggle({ race: vm.listItem });
        };

        vm.deleteToggle = function (event) {

            var confirm = $mdDialog.confirm()
                            .title('Confirm Deletion')
                            .textContent('Please confirm that you wish to delete this Race.')
                            .targetEvent(event)
                            .ok('Delete')
                            .cancel('Cancel');

            $mdDialog.show(confirm).then(vm.delete, function () { /*nop*/ });

        };

    }

}(this.angular));