var myApp = angular.module("racerApp");

function locationItemController($log) {

    var vm = this;

    vm.delete = function () {
        vm.onDelete({ location: vm.listItem });
    };

    vm.editToggle = function () {
        vm.onEditToggle({ location: vm.listItem });
    }

};

myApp.component("locationListItem", {
    templateUrl: 'Scripts/app/templates/locationListItem.html',
    controller: locationItemController,
    controllerAs: 'lItem',
    bindings: {
        listItem: '<',
        onEditToggle: '&',
        onDelete: '&'
    }
});