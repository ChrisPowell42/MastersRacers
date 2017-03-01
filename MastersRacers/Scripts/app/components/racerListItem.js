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

    controller.$inject = ['$log', '$mdDialog'];
    function controller($log, $mdDialog) {

        var vm = this;

        vm.delete = function () {
            vm.onDelete({ racer: vm.listItem });
        };

        vm.editToggle = function () {
            vm.onEditToggle({ racer: vm.listItem });
        }

        vm.deleteToggle = function (event) {

            var confirm = $mdDialog.confirm()
                            .title('Confirm Deletion')
                            .textContent('Please confirm that you wish to delete this racer.<br/>Cannot be undone.')
                            .targetEvent(event)
                            .ok('Delete')
                            .cancel('Cancel');

            $mdDialog.show(confirm).then(vm.delete, function () { /*nop*/ });

        };

    };

}(this.angular));