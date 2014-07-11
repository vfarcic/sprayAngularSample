angular.module('booksModule', ['ngTable'])
    .controller('booksCtrl', ['$scope', '$http', 'ngTableParams',
        function ($scope, $http, ngTableParams) {
            $scope.listBooks = function() {
                // TODO Skip asking server after PUT or DELETE requests
                $http.get('/api/v1/books').then(function(response) {
                    $scope.books = response.data;
                    $scope.setTableParams();
                });
            };
            $scope.openBook = function(bookId) {
                $http.get('/api/v1/books/' + bookId).then(function(response) {
                    $scope.book = response.data;
                    $scope.originalBook = angular.copy($scope.book);
                });
            };
            $scope.newBook = function() {
                $scope.book = {};
                $scope.originalBook = angular.copy($scope.book);
            };
            $scope.saveBook = function() {
                $scope.book.link = '/api/v1/books/' + $scope.book._id;
                $http.put('/api/v1/books', $scope.book).then(function() {
                    $scope.listBooks();
                    $scope.newBook();
                });
            };
            $scope.revertBook = function() {
                $scope.book = angular.copy($scope.originalBook);
            };
            $scope.deleteBook = function() {
                $http.delete('/api/v1/books/' + $scope.book._id).then(function() {
                    $scope.listBooks();
                    $scope.newBook();
                });
            };
            $scope.deleteAllBooks = function() {
                $http.delete('/api/v1/books').then(function() {
                    $scope.listBooks();
                });
            };
            $scope.cssClass = function(ngModelController) {
                return {
                    'has-error': ngModelController.$invalid,
                    'has-success': ngModelController.$valid
                };
            };
            $scope.cssClassButton = function(ngModelController) {
                return {
                    'btn-success': ngModelController.$valid,
                    'btn-danger': ngModelController.$invalid
                };
            };
            $scope.isValid = function(ngModelController) {
                return ngModelController.$valid && !angular.equals($scope.book, $scope.originalBook);
            };
            $scope.canRevertBook = function() {
                return !angular.equals($scope.book, $scope.originalBook);
            };
            $scope.canDeleteBook = function() {
                return (
                    typeof $scope.book !== 'undefined' &&
                    typeof $scope.book._id !== 'undefined' &&
                    $scope.book._id !== ''
                );
            };
            $scope.pricePattern = function() {
                return (/^[\d]+\.*(\d)*$/);
            };
            $scope.setTableParams = function() {
                var total = 0;
                if ($scope.books !== undefined) total = $scope.books.length;
                if ($scope.tableParams !== undefined) {
                    $scope.tableParams.count($scope.tableParams.count() - 1);
                }
                $scope.tableParams = new ngTableParams({
                    page: 1,
                    count: 10
                }, {
                    counts: [], // hide page counts control
                    total: total,
                    getData: function($defer, params) {
                        $defer.resolve($scope.books.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                });
            };
            // TODO Test
            $scope.listBooks();
            // TODO Test
            $scope.newBook();
        }
    ]);