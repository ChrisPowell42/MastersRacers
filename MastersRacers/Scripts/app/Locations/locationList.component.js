(function (angular) {

    'use strict';

    angular
        .module("racerApp")
        .component("locationList", {
            templateUrl: 'Scripts/app/Locations/locationList.template.html',
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

        vm.dataLoad = dataLoad;
        vm.toggleAddPanel = toggleAddPanel;
        vm.toggleEditPanel = toggleEditPanel;
        vm.addLocation = addLocation;
        vm.updateLocation = updateLocation;
        vm.deleteLocation = deleteLocation;

        function toggleAddPanel() {

            $log.log("toggleAddPanel called.");

            if (vm.addLocationCollapsed)
            {
                vm.editLocationCollapsed = true;
                vm.locationToEdit = null;
                vm.locationToAdd = LocationService.newLocation();
            }

            vm.addLocationCollapsed = !vm.addLocationCollapsed;

        }

        function toggleEditPanel(location) {

            $log.log("toggleEditPanel called.");

            if (vm.editLocationCollapsed && location !== null) {
                vm.addLocationCollapsed = true;
                vm.locationToAdd = null;
            }

            vm.editLocationCollapsed = (location === null);
            if (location !== null) {
                vm.locationToEdit = LocationService.cloneLocation(location);
            }
        }

        function dataLoad() {

            vm.locations = null;

            LocationService.get()
                           .then(setData, HttpErrorService.onError);

        }

        function setData(resp) {

            if (resp !== undefined)
                vm.locations = resp.data;

        }

        function addLocation(location) {

            LocationService.post(location)
                           .then(postAddLocation, HttpErrorService.onError);

        }

        function postAddLocation(resp) {

            var addedLocation = resp.data;

            if (addedLocation !== null) {
                vm.locations.push(addedLocation);
            }
            else
                $log.log('Could not find added location in response.');

            vm.addLocationCollapsed = true;

        }

        function findIdxById(location, locationList) {

            for (var i = 0; i < locationList.length; i++) {
                if (locationList[i].id === location.id) {
                    return i;
                }
            }

            return null;

        }

        function updateLocation(location) {

            $log.log("Update Location started");

            LocationService.post(location)
                           .then(vm.postUpdateLocation, HttpErrorService.onError);

        }

        function postUpdateLocation(resp) {

            var updatedLocation, idx;
            $log.log("Returned from Post location call.");

            updatedLocation = resp.data;
            if (updatedLocation) {
                idx = findIdxById(updatedLocation, vm.locations);
                if (idx !== null) {
                    vm.locations[idx] = updatedLocation;
                    vm.editLocationCollapsed = true;
                }
                else {
                    $log.log("Could not find updated location in response.");
                }
            }

        }

        function deleteLocation(location) {

            vm.locationToDelete = location;

            LocationService.delete(location.id)
                           .then(postDeleteLocation, HttpErrorService.onError);

        }

        function postDeleteLocation(resp) {

            var successful, idx;

            successful = resp.data;
            if (successful) {
                idx = vm.locations.indexOf(vm.locationToDelete);
                if (idx >= 0) {
                    vm.locations.splice(idx, 1);
                    vm.locationToDelete = null;
                }
            }


        }

    }

}(this.angular));