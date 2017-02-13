var myApp = angular.module("racerApp");

function modifyLocationController($log) {

    var mv = this;

    mv.modifyLocation = mv.modifyItem;

    mv.cancel = function () {
        $log.log("Cancel method called in modifyLocation");
        mv.onCancel();
    };

    mv.modify = function () {
        $log.log("Modify method called in modifyLocation");
        mv.onModify(mv.modifyLocation);
    };

}

myApp.component("modifyLocation", {
    templateUrl: 'Scripts/app/templates/modifyLocation.html',
    controller: modifyLocationController,
    controllerAs: 'mlCtrl',
    bindings: {
        modifyAction: '@',
        modifyItem: '<',
        onModify: '&',
        onCancel: '&'
    }
});