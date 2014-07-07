// TODO Test
angular.module('configModule', ['ngTable'])
    .config(['$routeProvider', '$locationProvider',
        function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $routeProvider
                .when('/page/home', {
                    templateUrl: '/assets/html/home/home.tmpl.html'
                })
                .when('/page/books', {
                    templateUrl: '/assets/html/books/books.tmpl.html',
                    controller: 'booksCtrl'
                })
                .when('/page/static/:name', {
                    templateUrl: function(params) {
                        return '/assets/html/static/' + params.name + '.tmpl.html';
                    }
                })
                .otherwise({
                    redirectTo: '/page/home'
                });
        }
    ]);