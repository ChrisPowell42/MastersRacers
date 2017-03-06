(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("locationList", {
            templateUrl: 'Scripts/app/templates/locationList.html',
            controller: Controller,
            controllerAs: 'locList',
            bindings: {
                locations: '<'
            }
        });

    Controller.$inject = ['$log', 'LocationService', 'HttpErrorService'];
    function Controller($log, LocationService, HttpErrorService) {

        var vm = this;

        vm.addLocationCollapsed = true;
        vm.editLocationCollapsed = true;

        vm.locationToEdit = null;
        vm.locationToAdd = null;
        vm.locationToDelete = null;

        vm.toggleAddPanel = function () {

            $log.log("toggleAddPanel called.");

            if (vm.addLocationCollapsed)
            {
                vm.editLocationCollapsed = true;
                vm.locationToEdit = null;
                vm.locationToAdd = LocationService.newLocation();
            }

            vm.addLocationCollapsed = !vm.addLocationCollapsed;

        };

        vm.toggleEditPanel = function (location) {

            $log.log("toggleEditPanel called.");

            if (vm.editLocationCollapsed && location !== null) {
                vm.addLocationCollapsed = true;
                vm.locationToAdd = null;
            }

            vm.editLocationCollapsed = (location === null);
            if (location !== null) {
                vm.locationToEdit = LocationService.cloneLocation(location);
            }
        };

        vm.setData = function (resp) {

            if (resp !== undefined)
                vm.locations = resp.data;

        };

        vm.dataLoad = function () {

            vm.locations = null;

            LocationService.get()
                           .then(vm.setData, HttpErrorService.onError);

        };

        //vm.$onInit = vm.dataLoad;

        vm.addLocation = function (location) {

            LocationService.post(location)
                           .then(vm.postAddLocation, HttpErrorService.onError);

        };

        vm.postAddLocation = function (resp) {

            var addedLocation = resp.data;

            if (addedLocation !== null) {
                vm.locations.push(addedLocation);
            }
            else
                $log.log('Could not find added location in response.');

            vm.addLocationCollapsed = true;

        };

        vm.findIdxById = function (location, locationList) {

            for (var i = 0; i < locationList.length; i++) {
                if (locationList[i].id === location.id) {
                    return i;
                }
            }

            return null;

        };

        vm.updateLocation = function (location) {

            $log.log("Update Location started");

            LocationService.post(location)
                           .then(vm.postUpdateLocation, HttpErrorService.onError);

        };

        vm.postUpdateLocation = function (resp) {

            $log.log("Returned from Post location call.");

            var updatedLocation = resp.data;
            if (updatedLocation !== null) {
                var idx = vm.findIdxById(updatedLocation, vm.locations);
                if (idx !== null) {
                    vm.locations[idx] = updatedLocation;
                    vm.editLocationCollapsed = true;
                }
                else {
                    $log.log("Could not find updated location in response.");
                }
            }

        };

        vm.deleteLocation = function (location) {

            vm.locationToDelete = location;

            LocationService.delete(location.id)
                           .then(vm.postDeleteLocation, HttpErrorService.onError);

        };

        vm.postDeleteLocation = function (resp) {

            var successful = resp.data;
            if (successful) {
                var idx = vm.locations.indexOf(vm.locationToDelete);
                if (idx >= 0) {
                    vm.locations.splice(idx, 1);
                    vm.locationToDelete = null;
                }
            }


        };

    }

}(this.angular));