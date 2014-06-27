angular.module('configModule', ['ngTable'])
    .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/page/home', {
                    templateUrl: '/assets/html/home/home.tmpl.html',
                    controller: 'homeCtrl'
                })
                .when('/page/books', {
                    templateUrl: '/assets/html/books/books.tmpl.html',
                    controller: 'booksCtrl'
                })
                .otherwise({
                    redirectTo: '/page/home'
                });
        }
    ]);