(function (angular) {

    'use strict';

    angular
        .module("racerApp")
        .component("raceEventListItem", {
            templateUrl: 'Scripts/app/RaceEvents/raceEventListItem.template.html',
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

        vm.deleteToggle = deleteToggle;
        
        function deleteToggle(event) {

            var confirm = $mdDialog.confirm()
                            .title('Confirm Deletion')
                            .textContent('Please confirm that you wish to delete this Race.')
                            .targetEvent(event)
                            .ok('Delete')
                            .cancel('Cancel');

            $mdDialog.show(confirm)
                     .then(callDelete, function () { /*nop*/ });

        }

        function callDelete() {
            vm.onDelete({ race: vm.listItem });
        }

    }

}(this.angular));