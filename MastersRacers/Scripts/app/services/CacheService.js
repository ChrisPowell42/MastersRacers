(function(angular) {

    'use strict';

    angular
        .module('racerApp')
        .service('CacheService', CacheService);

    CacheService.$inject = ['$log'];
    function CacheService($log) {

        var vm = this;

        var allCaches = [];

        vm.stashItem = stashItem;
        vm.popItem = popItem;

        vm.findInListById = findInListById;

        function stashItem(cache, item) {

            var currentCache = allCaches[cache];

            if (!currentCache) {
                allCaches[cache] = [];
                currentCache = allCaches[cache];
            }

            currentCache.push(item);

        }

        function popItem(cache) {

            var cachedItems = allCaches[cache];

            if (!cachedItems) {
                $log.log('Attempt to access undefined cache.');
                return null;
            }

            if (cachedItems && cachedItems.length > 0) {
                return cachedItems.pop();
            } else {
                $log.log('Attempt to pop empty cache.');
                return null;
            }

        }

        function findInListById(id, itemList) {

            for (var i = 0; i < itemList.length; i++) {
                if (itemList[i].id === id) {
                    return itemList[i];
                }
            }

            return null;
        }

    }

}(this.angular));
