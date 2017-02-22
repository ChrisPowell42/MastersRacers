(function (ng) {

    'use strict';

    angular
        .module("racerApp")
        .component("locationList", {
            templateUrl: 'Scripts/app/templates/locationList.html',
            controller: controller,
            controllerAs: 'locList'
        });

    controller.$inject = ['$scope', '$q', '$log', 'locationService'];
    function controller($scope, $q, $log, locationService) {

        var vm = this;

        vm.locations = [];
        vm.addLocationCollapsed = true;
        vm.editLocationCollapsed = true;

        vm.locationToEdit = null;
        vm.locationToAdd = null;

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

        vm.dataLoad = function () {

            vm.locations = null;

            var promiseLoc = locationService.get();

            $scope.combineResult = $q.all([promiseLoc]).then(function (resp) {
                vm.locations = resp[0].data;
            });
        }

        vm.$onInit = vm.dataLoad;

        vm.addLocation = function (location) {

            var promise = locationService.post(location);
            var addedLocation = null;

            $scope.combineResult = $q.all([promise]).then(function (resp) {

                addedLocation = resp[0].data;
                if (addedLocation != null) {
                    vm.locations.push(addedLocation);
                }

                vm.addLocationCollapsed = true;

            });

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

            var promise = locationService.post(location);
            var updatedLocation = null;

            $scope.combineResult = $q.all([promise]).then(function (resp) {

                $log.log("Returned from Post location call.");
                updatedLocation = resp[0].data;
                if (updatedLocation != null) {
                    var idx = vm.findIdxById(updatedLocation, vm.locations);
                    if (idx != null) {
                        vm.locations[idx] = updatedLocation;
                        vm.editLocationCollapsed = true;
                    }
                    else
                    {
                        $log.log("Could not find updated location.");
                    }
                }

            });

        };

        vm.deleteLocation = function (location) {

            //This probably isn't best practice.  Will fix up later.
            var proceed = confirm("Delete location " + location.name + " ?");

            if (proceed) {

                var promise = locationService.delete(location.id);
                var successful = false;

                $scope.combineResult = $q.all([promise]).then(function (resp) {
                    successful = resp[0].data;
                    if (successful) {
                        var idx = vm.locations.indexOf(location);
                        if (idx >= 0) {
                            vm.locations.splice(idx, 1);
                        }
                    };
                });
            };

        };

    };

}(this.angular));