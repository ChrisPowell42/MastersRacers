var myApp = angular.module("racerApp");

function locationItemController() {

    var vm = this;

};

myApp.component("locationListItem", {
    templateUrl: 'Scripts/app/templates/locationListItem.html',
    controller: locationItemController,
    controllerAs: 'lItem',
    bindings: {
        listItem: '<'
    }
});