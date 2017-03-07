(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .config(Configuration);

    Configuration.$inject = ['$stateProvider', '$urlRouterProvider'];
    function Configuration($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/default');

        var defaultState = {
            name: 'default',
            url: '/default',
            templateUrl: 'Scripts/app/templates/default.html'
        };

        var seasonState = {
            name: 'seasons',
            url: '/seasons',
            component: 'seasonList',
            resolve: {
                seasons: function(SeasonService) {
                    return SeasonService.getResolved();
                }
            }
        };

        var locationState = {
            name: 'locations',
            url: '/locations',
            component: 'locationList',
            resolve: {
                locations: function(LocationService) {
                    return LocationService.getResolved();
                }
            }
        };

        var addLocationState = {
            name: 'locations.add',
            url: '/add',
            component: 'modifyLocation',
            resolve: {
                modifyAction: function() { return 'Add'; },
                modifyItem: function(LocationService) {
                    return LocationService.newLocation();
                }
            }
        };

        var editLocationState = {
            name: 'locations.edit',
            url: '/edit/:id',
            component: 'modifyLocation',
            resolve: {
                modifyAction: function() { return 'Edit'; },
                modifyItem: function(LocationService, $transition$, locations) {
                    var locationId = $transition$.params().id;
                    var cloneLocation = LocationService.findLocationInListById(locationId, locations);
                    return LocationService.cloneLocation(cloneLocation);
                }
            }
        };

        var viewLocationState = {
            name: 'locations.detail',
            url: '/:id',
            component: 'locationDetail',
            resolve: {
                location: function(LocationService, $transition$, locations) {
                    var locationId = $transition$.params().id;
                    return LocationService.findLocationInListById(locationId, locations);
                }
            }
        };

        var racersState = {
            name: 'racers',
            url: '/racers',
            component: 'racerList',
            resolve: {
                racers: function(RacerService) {
                    return RacerService.getResolved();
                },
                raceSeries: function(RefDataService) {
                    return RefDataService.getRaceSeriesResolved();
                }
            }
        };

        var raceEventsState = {
            name: 'races',
            url: '/races',
            component: 'raceEventList',
            resolve: {
                raceEvents: function(RaceEventService) {
                    return RaceEventService.getActiveResolved();
                },
                raceFormats: function(RefDataService) {
                    return RefDataService.getRaceFormatsResolved();
                },
                locations: function(LocationService) {
                    return LocationService.getResolved();
                },
                activeSeason: function(SeasonService) {
                    return SeasonService.getActiveResolved();
                }
            }
        };

        $stateProvider.state(defaultState);
        $stateProvider.state(seasonState);
        $stateProvider.state(locationState);
        $stateProvider.state(addLocationState);
        $stateProvider.state(editLocationState);
        $stateProvider.state(viewLocationState);
        $stateProvider.state(racersState);
        $stateProvider.state(raceEventsState);

    }

}(this.angular));
