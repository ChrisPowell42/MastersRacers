var myApp = angular.module("racerApp");

function racersController($scope, $q, racersService) {

    $scope.Racers = [];

    var vm = this;
    vm.$onInit = loadData();

    function loadData() {
        var promiseRacer = racersService.get();

        $scope.combineResult = $q.all([promiseRacer]).then(function (resp) {
            $scope.Racers = resp[0].data;
        });

    }

};

myApp.component("racerList", {
    templateUrl: 'Scripts/app/templates/racersTemplate.html',
    controller: racersController,
    controllerAs: 'hlWld'
});

myApp.service("racersService", function ($http) {
    this.get = function () {
        var response = $http.get('/racers');
        return response;
    };
});

