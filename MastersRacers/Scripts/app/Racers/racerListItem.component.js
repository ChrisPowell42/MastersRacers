(function (angular) {

    'use strict';

    angular
        .module("racerApp")
        .component("racerListItem", {
            templateUrl: 'Scripts/app/Racers/racerListItem.template.html',
            controller: Controller,
            controllerAs: 'rItem',
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
                            .textContent('Please confirm that you wish to delete this racer.<br/>Cannot be undone.')
                            .targetEvent(event)
                            .ok('Delete')
                            .cancel('Cancel');

            $mdDialog.show(confirm)
                     .then(callDelete, function () { /*nop*/ });

        }

        function callDelete () {
            vm.onDelete({ racer: vm.listItem });
        }

    }

}(this.angular));