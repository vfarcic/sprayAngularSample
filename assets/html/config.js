angular.module('configModule', ['ngTable'])
    .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/assets/html/index.html', {
                    templateUrl: '/assets/html/books/books.tmpl.html',
                    controller: 'booksCtrl'
                })
                .otherwise({
                    redirectTo: '/assets/html/index.html'
                });
        }
    ]);