var myApp = angular.module("racerApp");

function seasonItemController($log) {

    var vm = this;

    vm.editToggle = function () {
        $log.log("editToggle clicked.");
        vm.onEditToggle({ season: vm.listItem });
    }

};

myApp.component("seasonListItem", {
    templateUrl: 'Scripts/app/templates/seasonListItem.html',
    controller: seasonItemController,
    controllerAs: 'sItem',
    bindings: {
        listItem: '<',
        onEditToggle: '&'
    }
});