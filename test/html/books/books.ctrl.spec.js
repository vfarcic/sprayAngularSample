describe('booksModule controllers', function() {

    var httpBackend;

    beforeEach(module('booksModule'));

    describe('booksCtrl controller', function() {

        var scope, book, books, bookId;
        var listBooksSpy;

        beforeEach(
            inject(function($rootScope, $injector, $controller, $httpBackend, ngTableParams) {
                book = {_id: 1};
                books = [book];
                bookId = 1;
                scope = $rootScope.$new();
                $controller("booksCtrl", {
                    $scope: scope
                });
                httpBackend = $httpBackend;
                httpBackend.expectGET('/api/v1/books').respond(books);
            })
        );

        describe('listBooks function', function() {
            beforeEach(function() {
                httpBackend.expectGET('/api/v1/books').respond(books);
            });
            it('should call GET /api/v1/books', function() {
                scope.listBooks();
                httpBackend.flush();
            });
            it('should set value to the books variable', function() {
                scope.books = [];
                scope.listBooks();
                httpBackend.flush();
                expect(scope.books).toEqual(books);
            });
            it('should call the setTableParams function', function() {
                spyOn(scope, 'setTableParams');
                scope.listBooks();
                httpBackend.flush();
                expect(scope.setTableParams).toHaveBeenCalled();
            });
        });

        describe('openBook function', function() {
            beforeEach(function() {
                httpBackend.expectGET('/api/v1/books/_id/' + bookId).respond(book);
            });
            it('should call GET /api/v1/books/[BOOK_ID]', function() {
                scope.openBook(bookId);
                httpBackend.flush();
            });
            it('should set value to the book variable', function() {
                scope.book = {};
                scope.openBook(bookId);
                httpBackend.flush();
                expect(scope.book).toEqual(book);
            });
            it('should set value to the originalBook variable', function() {
                scope.originalBook = {};
                scope.openBook(bookId);
                httpBackend.flush();
                expect(scope.originalBook).toEqual(book);
            });
        });

        describe('newBook function', function() {
            it('should set empty value to the book variable', function() {
                scope.book = book;
                scope.newBook();
                expect(scope.book).toEqual({});
            });
            it('should set empty value to the originalBook variable', function() {
                scope.originalBook = book;
                scope.newBook();
                expect(scope.originalBook).toEqual({});
            });
        });

        describe('saveBook function', function() {
            beforeEach(function() {
                spyOn(scope, 'listBooks');
                spyOn(scope, 'newBook');
                scope.book = book;
            });
            it('should call PUT /api/v1/books', function() {
                httpBackend.expectPUT('/api/v1/books').respond();
                scope.saveBook();
                httpBackend.flush();
            });
            it('should call add link to the book and send it as part of the request', function() {
                var modifiedBook = angular.copy(book);
                modifiedBook.link = '/api/v1/books/' + bookId;
                httpBackend.expectPUT('/api/v1/books', modifiedBook).respond();
                scope.saveBook();
                httpBackend.flush();
            });
            it('should call listBooks function', function() {
                httpBackend.expectPUT('/api/v1/books').respond();
                scope.saveBook();
                httpBackend.flush();
                expect(scope.listBooks).toHaveBeenCalled();
            });
            it('should call newBook function', function() {
                httpBackend.expectPUT('/api/v1/books').respond();
                scope.saveBook();
                httpBackend.flush();
                expect(scope.newBook).toHaveBeenCalled();
            });
        });

        describe('revertBook function', function() {
            it('should revert book to the value of the originalBook', function() {
                scope.book = {};
                scope.originalBook = book;
                scope.revertBook();
                expect(scope.book).toEqual(scope.originalBook);
            });
        });

       describe('deleteBook function', function() {
            beforeEach(function() {
                spyOn(scope, 'listBooks');
                spyOn(scope, 'newBook');
                scope.book = book;
                httpBackend.expectDELETE('/api/v1/books/_id/' + bookId).respond();
            });
            it('should call DELETE /api/v1/books/[BOOK_ID]', function() {
                scope.deleteBook();
                httpBackend.flush();
            });
            it('should call listBooks function', function() {
                scope.deleteBook();
                httpBackend.flush();
                expect(scope.listBooks).toHaveBeenCalled();
            });
            it('should call newBook function', function() {
                scope.deleteBook();
                httpBackend.flush();
                expect(scope.newBook).toHaveBeenCalled();
            });
        });

       describe('deleteAllBooks function', function() {
            beforeEach(function() {
                spyOn(scope, 'listBooks');
                httpBackend.expectDELETE('/api/v1/books').respond();
            });
            it('should call DELETE /api/v1/books', function() {
                scope.deleteAllBooks();
                httpBackend.flush();
            });
            it('should call listBooks function', function() {
                scope.deleteAllBooks();
                httpBackend.flush();
                expect(scope.listBooks).toHaveBeenCalled();
            });
        });

        describe('cssClass function', function() {
            var ngModelController;
            beforeEach(function() {
                ngModelController = {$invalid: false, $valid: true};
            });
            it('should return has-error when model controller is invalid', function() {
                ngModelController = {$invalid: true, $valid: false};
                var expected = {
                    'has-error': true,
                    'has-success': false
                }
                expect(scope.cssClass(ngModelController)).toEqual(expected);
            });
            it('should return has-success when model controller is valid', function() {
                var expected = {
                    'has-error': false,
                    'has-success': true
                }
                expect(scope.cssClass(ngModelController)).toEqual(expected);
            });
        });

        describe('cssClassButton function', function() {
            var ngModelController;
            beforeEach(function() {
                ngModelController = {$invalid: false, $valid: true};
            });
            it('should return has-error when model controller is invalid', function() {
                ngModelController = {$invalid: true, $valid: false};
                var expected = {'btn-danger': true, 'btn-success': false}
                expect(scope.cssClassButton(ngModelController)).toEqual(expected);
            });
            it('should return has-success when model controller is valid', function() {
                var expected = {'btn-danger': false, 'btn-success': true}
                expect(scope.cssClassButton(ngModelController)).toEqual(expected);
            });
        });

        describe('isValid function', function() {
            var ngModelController;
            beforeEach(function() {
                scope.book = book;
                scope.originalBook = {};
                ngModelController = {$invalid: false, $valid: true};
            });
            it('should return true when ngModelController is valid and book and originalBook are NOT equal', function() {
                expect(scope.isValid(ngModelController)).toEqual(true);
            });
            it('should return false when ngModelController is invalid', function() {
                ngModelController = {$invalid: true, $valid: false};
                expect(scope.isValid(ngModelController)).toEqual(false);
            });
            it('should return false when book and originalBook are equal', function() {
                scope.originalBook = angular.copy(scope.book);
                expect(scope.isValid(ngModelController)).toEqual(false);
            });
            it('should return true when ngModelController is invalid and book and originalBook are equal', function() {
                ngModelController = {$invalid: true, $valid: false};
                scope.originalBook = angular.copy(scope.book);
                expect(scope.isValid(ngModelController)).toEqual(false);
            });
        });

        describe('canRevertBook function', function() {
            beforeEach(function() {
                scope.book = book;
                scope.originalBook = {};
            });
            it('should return false when book and originalBook are the same', function() {
                scope.originalBook = angular.copy(scope.book);
                expect(scope.canRevertBook()).toEqual(false);
            });
            it('should return true when book and originalBook are NOT the same', function() {
                expect(scope.canRevertBook()).toEqual(true);
            });
        });

        describe('canDeleteBook function', function() {
            it('should return false when book is undefined', function() {
                scope.book = undefined;
                expect(scope.canDeleteBook()).toEqual(false);
            });
            it('should return false when book is empty JSON', function() {
                scope.book = {};
                expect(scope.canDeleteBook()).toEqual(false);
            });
            it('should return false when book ID is undefined', function() {
                scope.book._id = undefined;
                expect(scope.canDeleteBook()).toEqual(false);
            });
            it('should return false when book ID is empty', function() {
                scope.book._id = '';
                expect(scope.canDeleteBook()).toEqual(false);
            });
        });

        describe('pricePattern function', function() {
            it('should start with a number', function() {
                expect('a1').not.toMatch(scope.pricePattern());
            });
            it('should start with at least one digit', function() {
                expect('.123').not.toMatch(scope.pricePattern());
            });
            it('should have at least one digit', function() {
                expect('.23').not.toMatch(scope.pricePattern());
            });
            it('should allow only numbers and one dot (.) as decimal separator', function() {
                expect('x.23').not.toMatch(scope.pricePattern());
                expect('23.x').not.toMatch(scope.pricePattern());
            });
            it('should return true when only digits', function() {
                expect('123').toMatch(scope.pricePattern());
            });
            it('should return true when digits followed with dot (.)', function() {
                expect('123.').toMatch(scope.pricePattern());
            });
            it('should return true when digits followed with dot (.) and more digits', function() {
                expect('123.45').toMatch(scope.pricePattern());
            });
        });

        describe('setTableParams function', function() {
            it('should assign new ngTableParams to tableParams', function() {
                scope.setTableParams();
                expect(scope.tableParams).toBeDefined();
            });
            it('should set ngTableParams page to 1', function() {
                scope.setTableParams();
                expect(scope.tableParams.page()).toBe(1);
            });
            it('should set ngTableParams count to 10', function() {
                scope.setTableParams();
                expect(scope.tableParams.count()).toBe(10);
            });
            it('should set ngTableParams settings().counts to [] (hide counts)', function() {
                scope.setTableParams();
                expect(scope.tableParams.settings().counts).toEqual([]);
            });
            it('should set ngTableParams settings().total to 0 when books are undefined', function() {
                scope.books = undefined;
                scope.setTableParams();
                expect(scope.tableParams.settings().total).toEqual(0);
            });
            it('should set ngTableParams settings().total to 0 when books are empty', function() {
                scope.books = [];
                scope.setTableParams();
                expect(scope.tableParams.settings().total).toEqual(0);
            });
            it('should set ngTableParams settings().total to the number of books', function() {
                scope.books = [{_id: 1}, {_id: 2}, {_id: 3}];
                scope.setTableParams();
                expect(scope.tableParams.settings().total).toEqual(scope.books.length);
            });

        });

    });

});