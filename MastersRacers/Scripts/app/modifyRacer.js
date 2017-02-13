var myApp = angular.module("racerApp");

function modifyRacerController($log) {

    var mv = this;

    mv.modifyRacer = mv.modifyItem;

    mv.cancel = function () {
        mv.onCancel();
    };

    mv.modify = function () {
        mv.onModify(mv.modifyRacer);
    };

}

myApp.component("modifyRacer", {
    templateUrl: 'Scripts/app/templates/modifyRacer.html',
    controller: modifyRacerController,
    controllerAs: 'mrCtrl',
    bindings: {
        modifyAction: '@',
        modifyItem: '<',
        onModify: '&',
        onCancel: '&'
    }
});