(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("locationList", {
            templateUrl: 'Scripts/app/templates/locationList.html',
            controller: controller,
            controllerAs: 'locList'
        });

    controller.$inject = ['$mdToast', '$log', 'locationService'];
    function controller($mdToast, $log, locationService) {

        var vm = this;

        vm.locations = [];
        vm.addLocationCollapsed = true;
        vm.editLocationCollapsed = true;

        vm.locationToEdit = null;
        vm.locationToAdd = null;
        vm.locationToDelete = null;

        vm.newLocation = function () {
            return {
                id: null,
                name: 'New Location',
                description: '',
                latPos: 0.0,
                longPos: 0.0
            };
        };

        //There is probably a better way of doing this.
        //It will work for now.
        vm.cloneLocation = function (location) {
            return {
                id: location.id,
                name: location.name,
                description: location.description,
                latPos: location.latPos,
                longPos: location.longPos
            };
        };

        vm.toggleAddPanel = function () {

            $log.log("toggleAddPanel called.");

            if (vm.addLocationCollapsed)
            {
                vm.editLocationCollapsed = true;
                vm.locationToEdit = null;
                vm.locationToAdd = vm.newLocation();
            }

            vm.addLocationCollapsed = !vm.addLocationCollapsed;

        };

        vm.toggleEditPanel = function (location) {

            $log.log("toggleEditPanel called.");

            if (vm.editLocationCollapsed && location != null) {
                vm.addLocationCollapsed = true;
                vm.locationToAdd = null;
            }

            vm.editLocationCollapsed = (location == null);
            if (location != null) {
                vm.locationToEdit = vm.cloneLocation(location);
            }
        };

        vm.onError = function (httpError) {

            $log.log(httpError.data);

            var errorToast = $mdToast.simple()
                                     .textContent('Location Error has occured: ' + httpError.status + ' - ' + httpError.statusText + ' (' + httpError.config.url + ')')
                                     .hideDelay(0)
                                     .action('Ok');

            $mdToast.show(errorToast).then(function (response) {
                $mdToast.hide(errorToast);
                vm.locationToDelete = null;
            });

        };

        vm.setData = function (resp) {

            if (resp != undefined)
                vm.locations = resp.data;

        };

        vm.dataLoad = function () {

            vm.locations = null;

            locationService.get()
                           .then(vm.setData, vm.onError);

        }

        vm.$onInit = vm.dataLoad;

        vm.addLocation = function (location) {

            locationService.post(location).then(vm.postAddLocation, vm.onError);

        };

        vm.postAddLocation = function (resp) {

            var addedLocation = resp.data;

            if (addedLocation != null) {
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

            locationService.post(location).then(vm.postUpdateLocation, vm.onError);

        };

        vm.postUpdateLocation = function (resp) {

            $log.log("Returned from Post location call.");

            var updatedLocation = resp.data;
            if (updatedLocation != null) {
                var idx = vm.findIdxById(updatedLocation, vm.locations);
                if (idx != null) {
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

            locationService.delete(location.id).then(vm.postDeleteLocation, vm.onError);

        };

        vm.postDeleteLocation = function (resp) {

            var successful = resp.data;
            if (successful) {
                var idx = vm.locations.indexOf(vm.locationToDelete);
                if (idx >= 0) {
                    vm.locations.splice(idx, 1);
                    vm.locationToDelete = null
                }
            };


        };

    };

}(this.angular));