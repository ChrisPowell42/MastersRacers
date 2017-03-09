(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .service('CacheService', CacheService);

     CacheService.$inject = ['$log'];
    function CacheService($log) {

        var vm = this;

        var cachedItems = [];

        vm.stashItem = stashItem;
        vm.popItem = popItem;

        function stashItem(item) {

            cachedItems.push(item);

        }

        function popItem() {

            if (cachedItems && cachedItems.length > 0) {
                return cachedItems.pop();
            } else {
                $log.log('Attempt to pop empty cache.');
                return null;
            }

        }

    }

}(this.angular));
