(function (ng) {

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
                seasons: function (SeasonService) {
                    return SeasonService.getResolved();
                }
            }
        };

        var locationState = {
            name: 'locations',
            url: '/locations',
            component: 'locationList',
            resolve: {
                locations: function (LocationService) {
                    return LocationService.getResolved();
                }
            }
        };

        var racersState = {
            name: 'racers',
            url: '/racers',
            component: 'racerList',
            resolve: {
                racers: function (RacerService) {
                    return RacerService.getResolved();
                },
                raceSeries: function (RefDataService) {
                    return RefDataService.getRaceSeriesResolved();
                }
            }
        };

        var raceEventsState = {
            name: 'races',
            url: '/races',
            component: 'raceEventList',
            resolve: {
                raceEvents: function (RaceEventService) {
                    return RaceEventService.getActiveResolved();
                },
                raceFormats: function (RefDataService) {
                    return RefDataService.getRaceFormatsResolved();
                },
                locations: function (LocationService) {
                    return LocationService.getResolved();
                },
                activeSeason: function (SeasonService) {
                    return SeasonService.getActiveResolved();
                }
            }
        };

        $stateProvider.state(defaultState);
        $stateProvider.state(seasonState);
        $stateProvider.state(locationState);
        $stateProvider.state(racersState);
        $stateProvider.state(raceEventsState);

    }

}(this.angular));