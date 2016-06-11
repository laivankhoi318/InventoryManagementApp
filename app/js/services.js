'use strict';

(function (window, angular) {

    var imServices = angular.module('imServices', []);

    imServices.factory('dbService', [
        '$indexedDB',
        'OBJECT_STORE_NAME_PRODUCT',
        'OBJECT_STORE_NAME_VENDOR',
        'OBJECT_STORE_NAME_TYPE',
        function ($indexedDB, OBJECT_STORE_NAME_PRODUCT, OBJECT_STORE_NAME_VENDOR, OBJECT_STORE_NAME_TYPE) {
            var initDb = function () {
                // initialize types
                var types = [
                    {"name": "Phone"},
                    {"name": "Tablet"},
                    {"name": "Laptop"}
                ];
                $indexedDB.openStore(OBJECT_STORE_NAME_TYPE, function (store) {
                    store.clear().then(function () {});
                    store.insert(types).then(function (e) {});
                });

                // initialize vendors
                var vendors = [
                    {"name": "Das Auto", "logo": "img/logo/logo1.jpg"},
                    {"name": "Topica EDTech Group", "logo": "img/logo/logo2.jpg"},
                    {"name": "Google", "logo": "img/logo/logo3.jpg"},
                    {"name": "Founder Institute", "logo": "img/logo/logo4.jpg"},
                    {"name": "Magic", "logo": "img/logo/logo5.jpg"}
                ];
                $indexedDB.openStore(OBJECT_STORE_NAME_VENDOR, function (store) {
                    store.clear().then(function () {});
                    store.insert(vendors).then(function (e) {});
                });
                
                // initialize products
                var products = [
                    {"name": "Laptop HP Envy", "vendor_id": "HP", "type_id": "Laptop", "serial_number": "123456", "price": "50.00", "weight": "200", "color": "Black", "release_date": new Date('10/06/2016').getTime() / 1000, "published": "1", "photo": "img/product/p-img1.jpg", "created_date": new Date('10/06/2016').getTime() / 1000},
                    {"name": "Laptop Dell Inspiration", "vendor_id": "Dell", "type_id": "Laptop", "serial_number": "123456", "price": "50.00", "weight": "200", "color": "Black", "release_date": new Date('10/06/2016').getTime() / 1000, "published": "1", "photo": "img/product/p-img2.jpg", "created_date": new Date('10/06/2016').getTime() / 1000},
                    {"name": "Laptop HP Envy", "vendor_id": "HP", "type_id": "Laptop", "serial_number": "123456", "price": "50.00", "weight": "200", "color": "Black", "release_date": new Date('10/06/2016').getTime() / 1000, "published": "1", "photo": "img/product/p-img3.jpg", "created_date": new Date('10/06/2016').getTime() / 1000},
                    {"name": "Laptop HP Envy", "vendor_id": "HP", "type_id": "Laptop", "serial_number": "123456", "price": "50.00", "weight": "200", "color": "Black", "release_date": new Date('10/06/2016').getTime() / 1000, "published": "1", "photo": "img/product/p-img4.jpg", "created_date": new Date('10/06/2016').getTime() / 1000},
                    {"name": "Laptop HP Envy", "vendor_id": "HP", "type_id": "Laptop", "serial_number": "123456", "price": "50.00", "weight": "200", "color": "Black", "release_date": new Date('10/06/2016').getTime() / 1000, "published": "1", "photo": "img/product/p-img4.jpg", "created_date": new Date('10/06/2016').getTime() / 1000},
                    {"name": "Laptop HP Envy", "vendor_id": "HP", "type_id": "Laptop", "serial_number": "123456", "price": "50.00", "weight": "200", "color": "Black", "release_date": new Date('10/06/2016').getTime() / 1000, "published": "1", "photo": "img/product/p-img4.jpg", "created_date": new Date('10/06/2016').getTime() / 1000}
                ];
                $indexedDB.openStore(OBJECT_STORE_NAME_PRODUCT, function (store) {
                    store.clear().then(function () { });
                    store.insert(products).then(function (e) { });
                });
            };

            var getAll = function (type, callback) {
                $indexedDB.openStore(type, function (store) {
                    store.getAll().then(function (data) {
                        if (typeof callback === 'function') {
                            callback(data);
                        }
                    });
                });
            };

            var getLatestProducts = function (callback) {
                $indexedDB.openStore(OBJECT_STORE_NAME_PRODUCT, function (products) {
                    var latestProducts = [];
                    var find = products.query().$index("created_date_idx").$desc(false);
                    products.each(find).then(function (e) {
                        latestProducts.push(e);
                    });
                    if (latestProducts.length > 5) {
                        latestProducts = latestProducts.slice(0, 5);
                    }
                    if (typeof callback === 'function') {
                        callback(latestProducts);
                    }
                });
            };

            return {
                initDb: initDb,
                getAll: getAll,
                getLatestItems: getLatestProducts
            }
        }
    ]);

})(window, window.angular);