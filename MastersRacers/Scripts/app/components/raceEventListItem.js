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

    controller.$inject = ['$log', '$mdDialog'];
    function controller($log, $mdDialog) {

        var vm = this;

        vm.delete = function () {
            vm.onDelete({ race: vm.listItem });
        };

        vm.editToggle = function () {
            vm.onEditToggle({ race: vm.listItem });
        }

        vm.deleteToggle = function (event) {

            var confirm = $mdDialog.confirm()
                            .title('Confirm Deletion')
                            .textContent('Please confirm that you wish to delete this Race.')
                            .targetEvent(event)
                            .ok('Delete')
                            .cancel('Cancel');

            $mdDialog.show(confirm).then(vm.delete, function () { /*nop*/ });

        };

    };

}(this.angular));