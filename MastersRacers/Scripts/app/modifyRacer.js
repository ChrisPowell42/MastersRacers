var myApp = angular.module("racerApp");

function modifyRacerController($log) {

    var mv = this;

    mv.seriesSelected = function () {

    };

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
        raceSeriesList: '<',
        onModify: '&',
        onCancel: '&'
    }
});