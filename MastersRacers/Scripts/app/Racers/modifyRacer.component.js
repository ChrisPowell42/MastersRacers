(function (angular) {

    'use strict';

    angular
        .module("racerApp")
        .component("modifyRacer", {
            templateUrl: 'Scripts/app/Racers/modifyRacer.template.html',
            controller: Controller,
            controllerAs: 'mrCtrl',
            bindings: {
                modifyAction: '@',
                modifyItem: '<',
                raceSeriesList: '<',
                onModify: '&',
                onCancel: '&'
            }
        });

    Controller.$inject = ['$log', '$mdDialog'];
    function Controller($log, $mdDialog) {

        var mv = this;

        mv.modifyTrigger = modifyTrigger;
        
        function modifyTrigger(event) {

            var confirm = $mdDialog.confirm()
                            .title(mv.modifyAction + ' confirmation')
                            .textContent('Please confirm that you wish to ' + mv.modifyAction + ' this racer.')
                            .targetEvent(event)
                            .ok(mv.modifyAction)
                            .cancel('Cancel');

            $mdDialog.show(confirm).then(mv.modify, function () {/*Nop*/ });

        }

        function modify() {
            mv.onModify(mv.modifyItem);
        }
    }

}(this.angular));