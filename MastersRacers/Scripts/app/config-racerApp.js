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
            abstract: true,
            url: '/seasons',
            component: 'seasonList',
            resolve: {
                seasons: function(SeasonService) {
                    return SeasonService.getResolved();
                }
            }
        };

        var seasonListState = {
            name: 'seasons.list',
            url: '/list',
            template: 'Scripts/app/Seasons/seasonDefault.html'
        };

        var seasonDetailState = {
            name: 'seasons.detail',
            url: '/detail/:id',
            component: 'seasonDetail',
            resolve: {
                season: function(CacheService, $transition$, seasons) {
                        var seasonId = $transition$.params().id;
                        var detailSeason = CacheService.findInListById(seasonId, seasons);
                        return detailSeason;
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
                modifyItem: function(CacheService, LocationService, $transition$, locations) {
                    var locationId = $transition$.params().id;
                    var cloneLocation = CacheService.findInListById(locationId, locations);
                    return LocationService.cloneLocation(cloneLocation);
                }
            }
        };

        var viewLocationState = {
            name: 'locations.detail',
            url: '/:id',
            component: 'locationDetail',
            resolve: {
                location: function(CacheService, $transition$, locations) {
                    var locationId = $transition$.params().id;
                    return CacheService.findInListById(locationId, locations);
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
        $stateProvider.state(seasonListState);
        $stateProvider.state(seasonDetailState);
        $stateProvider.state(locationState);
        $stateProvider.state(addLocationState);
        $stateProvider.state(editLocationState);
        $stateProvider.state(viewLocationState);
        $stateProvider.state(racersState);
        $stateProvider.state(raceEventsState);

    }

}(this.angular));
