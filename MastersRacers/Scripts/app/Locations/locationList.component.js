﻿(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .component('locationList', {
            templateUrl: 'Scripts/app/Locations/locationList.template.html',
            controller: Controller,
            controllerAs: 'locList',
            bindings: {
                locations: '<'
            }
        });

    Controller.$inject = ['$log', '$state', 'LocationService', 'CacheService', 'HttpErrorService'];
    function Controller($log, $state, LocationService, CacheService, HttpErrorService) {

        var vm = this;

        vm.locationToDelete = null;

        vm.dataLoad = dataLoad;
        vm.addLocation = addLocation;
        vm.updateLocation = updateLocation;
        vm.deleteLocation = deleteLocation;
        vm.handleModifyLocation = handleModifyLocation;
        vm.showLocations = showLocations;

        function showLocations() {
            $state.go('locations.list');
        }

        function dataLoad() {

            vm.locations = null;

            LocationService.get()
                           .then(setData, HttpErrorService.onError);

        }

        function setData(resp) {

            if (resp !== undefined) {
                vm.locations = resp.data;
            }

        }

        function addLocation(location) {

            LocationService.post(location)
                           .then(postAddLocation, HttpErrorService.onError);

        }

        function postAddLocation(resp) {

            var addedLocation = resp.data;

            if (addedLocation !== null) {
                vm.locations.push(addedLocation);
            } else {
                $log.log('Could not find added location in response.');
            }

            $state.go('locations', null, {reload: 'locations'});

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

            $log.log('Update Location started');

            LocationService.post(location)
                           .then(postUpdateLocation, HttpErrorService.onError);

        }

        function postUpdateLocation(resp) {

            var updatedLocation, idx;
            $log.log('Returned from Post location call.');

            updatedLocation = resp.data;
            if (updatedLocation) {
                idx = findIdxById(updatedLocation, vm.locations);
                if (idx !== null) {
                    vm.locations[idx] = updatedLocation;
                } else {
                    $log.log('Could not find updated location in response.');
                }
            }

            $state.go('locations', null, {reload: 'locations'});

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

        function handleModifyLocation() {

            $log.log('handleModifyLocation called.');

            var changedLocation = CacheService.popItem('Location');

            $log.log(changedLocation);

            if (!changedLocation.id) {
                addLocation(changedLocation);
            } else {
                updateLocation(changedLocation);
            }

        }

    }

}(this.angular));