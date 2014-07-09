describe('booksModule controllers', function() {

    var httpBackend;

    beforeEach(module('booksModule'));

    describe('booksCtrl controller', function() {

        var scope, book, books, bookId;

        beforeEach(
            inject(function($rootScope, $injector, $controller, $httpBackend) {
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
                httpBackend.expectGET('/api/v1/books/' + bookId).respond(book);
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
                httpBackend.expectDELETE('/api/v1/books/' + bookId).respond();
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

    });

});