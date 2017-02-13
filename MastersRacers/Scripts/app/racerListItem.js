var myApp = angular.module("racerApp");

function racerItemController($log) {

    var vm = this;

    vm.delete = function () {
        vm.onDelete({ racer: vm.listItem });
    };

    vm.editToggle = function () {
        vm.onEditToggle({ racer: vm.listItem });
    }

};

myApp.component("racerListItem", {
    templateUrl: 'Scripts/app/templates/racerListItem.html',
    controller: racerItemController,
    controllerAs: 'rItem',
    bindings: {
        listItem: '<',
        onEditToggle: '&',
        onDelete: '&'
    }
});