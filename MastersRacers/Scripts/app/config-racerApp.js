(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .config(Configuration);

    Configuration.$inject = ['$stateProvider', '$urlRouterProvider', '$mdThemingProvider'];
    function Configuration($stateProvider, $urlRouterProvider, $mdThemingProvider) {

        $mdThemingProvider.theme('default')
                          .primaryPalette('blue-grey')
                          .warnPalette('red')
                          .accentPalette('yellow')
                          .backgroundPalette('brown');

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
            templateUrl: 'Scripts/app/Seasons/seasonDefault.html'
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
            abstract: true,
            component: 'locationList',
            resolve: {
                locations: function(LocationService) {
                    return LocationService.getResolved();
                }
            }
        };

        var locationListState = {
            name: 'locations.list',
            url: '/list',
            templateUrl: 'Scripts/app/Locations/locationDefault.html'
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
            abstract: true,
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

        var racersDefaultState = {
            name: 'racers.list',
            url: '/list',
            templateUrl: 'Scripts/app/Racers/racerDefault.html'
        };

        var racerAddState = {
            name: 'racers.add',
            url: '/add',
            component: 'modifyRacer',
            resolve: {
                modifyAction: function() { return 'Add'; },
                modifyItem: function(RacerService) { return RacerService.newRacer(); },
                raceSeriesList: function(raceSeries) { return raceSeries; }
            }
        };

        var racerEditState = {
            name: 'racers.edit',
            url: '/edit/:id',
            component: 'modifyRacer',
            resolve: {
                modifyAction: function() { return 'Edit'; },
                modifyItem: function($transition$, CacheService, RacerService, racers) {
                    var racerId = $transition$.params().id;
                    var cloneRacer = CacheService.findInListById(racerId, racers);
                    return RacerService.cloneRacer(cloneRacer);
                },
                raceSeriesList: function(raceSeries) { return raceSeries; }
            }
        };

        var racerDetailState = {
            name: 'racers.detail',
            url: '/detail/:id',
            component: 'racerDetail',
            resolve: {
                detailItem: function($transition$, CacheService, racers) {
                    var racerId = $transition$.params().id;
                    return CacheService.findInListById(racerId, racers);
                }
            }
        };

        var raceEventsState = {
            name: 'races',
            url: '/races',
            abstract: true,
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

        var racesDefaultState = {
            name: 'races.list',
            url: '/list',
            templateUrl: 'Scripts/app/RaceEvents/raceEventDefault.html'
        };

        var addRaceState = {
            name: 'races.add',
            url: '/add',
            component: 'modifyRaceEvent',
            resolve: {
                locationList: function(locations) { return locations; },
                formatList: function(raceFormats) { return raceFormats;},
                modifyAction: function() { return 'Add'; },
                modifyItem: function(RaceEventService) {
                    return RaceEventService.newRaceEvent();
                }
            }
        };

        var editRaceState = {
            name: 'races.edit',
            url: '/edit/:id',
            component: 'modifyRaceEvent',
            resolve: {
                locationList: function(locations) { return locations; },
                formatList: function(raceFormats) { return raceFormats; },
                modifyAction: function() { return 'Edit'; },
                modifyItem: function(CacheService, RaceEventService, $transition$, raceEvents) {
                    var raceId = $transition$.params().id;
                    var cloneRace = CacheService.findInListById(raceId, raceEvents);
                    return RaceEventService.cloneRaceEvent(cloneRace);
                }
            }
        };

        var raceResultsDefaultState = {
            name: 'raceResults',
            url: '/raceresults/:raceId',
            component: 'raceResultDefault',
            resolve: {
                racePhases: function(RefDataService) {
                    return RefDataService.getRacePhasesResolved();
                },
                seasonRaces: function(RaceEventService) {
                    return RaceEventService.getActiveResolved();
                },
                activeSeason: function(SeasonService) {
                    return SeasonService.getActiveResolved();
                },
                selectedRace: ['$transition$', 'CacheService', 'seasonRaces', function($transition$, CacheService, seasonRaces) {
                    var raceId = $transition$.params().raceId;
                    var returnValue = null;
                    if (raceId) {
                        returnValue = CacheService.findInListById(raceId, seasonRaces);
                    }
                    return returnValue;
                }],
                selectedPhase: ['$transition$', 'racePhases', 'selectedRace', 'CacheService', function($transition$, racePhases, selectedRace, CacheService) {
                    var returnValue = null;
                    if (selectedRace) {
                        returnValue = CacheService.findInListById(selectedRace.racePhaseId, racePhases);
                    }
                    return returnValue;
                }]
            }
        };

        var raceResultsDefaultRaceState = {
            name: 'raceResultsNotSelected',
            url: '/raceresults',
            component: 'raceResultDefault',
            resolve: {
                racePhases: function(RefDataService) {
                    return RefDataService.getRacePhasesResolved();
                },
                seasonRaces: function(RaceEventService) {
                    return RaceEventService.getActiveResolved();
                },
                activeSeason: function(SeasonService) {
                    return SeasonService.getActiveResolved();
                },
                selectedRace: function() {
                    return null;
                },
                selectedPhase: function() {
                    return null;
                }
            }
        };

        var raceResultsScheduleState = {
            name: 'raceResults.scheduled',
            url: '/scheduled',
            component: 'raceResultScheduled',
            resolve: {
                raceItem: function(selectedRace) {
                    return selectedRace;
                }
            }
        };

        var raceResultsRecordingState = {
            name: 'raceResults.recording',
            url: '/recording',
            component: 'raceResultsRecording',
            resolve: {
                raceItem: function(selectedRace) {
                    return selectedRace;
                },
                raceResults: ['raceItem', 'RaceResultService', 'RaceResultNavService', function(raceItem, RaceResultService, RaceResultNavService) {

                    if (RaceResultNavService.isRecording(raceItem))
                    {
                        RaceResultsService.getResultsForRaceResolved();
                    }

                }]
            }
        };

        $stateProvider.state(defaultState);
        $stateProvider.state(seasonState);
        $stateProvider.state(seasonListState);
        $stateProvider.state(seasonDetailState);

        $stateProvider.state(locationState);
        $stateProvider.state(locationListState);
        $stateProvider.state(addLocationState);
        $stateProvider.state(editLocationState);
        $stateProvider.state(viewLocationState);

        $stateProvider.state(racersState);
        $stateProvider.state(racersDefaultState);
        $stateProvider.state(racerAddState);
        $stateProvider.state(racerEditState);
        $stateProvider.state(racerDetailState);

        $stateProvider.state(raceEventsState);
        $stateProvider.state(racesDefaultState);
        $stateProvider.state(addRaceState);
        $stateProvider.state(editRaceState);

        $stateProvider.state(raceResultsDefaultState);
        $stateProvider.state(raceResultsDefaultRaceState);
        $stateProvider.state(raceResultsScheduleState);
        $stateProvider.state(raceResultsRecordingState);

    }

}(this.angular));
