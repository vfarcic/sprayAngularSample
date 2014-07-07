describe('configModule controllers', function() {

    var route, httpBackend;

    beforeEach(module('ngRoute', 'configModule'));

    beforeEach(
        inject(function($route, $httpBackend) {
            route = $route;
            httpBackend = $httpBackend;
        })
    );

    describe('config controller', function() {

        describe('/page/home path', function() {
            var path = '/page/home';
            it('should use the template /assets/html/home/home.tmpl.html', function() {
                expect(route.routes[path].templateUrl).toEqual('/assets/html/home/home.tmpl.html');
            });
        });

        describe('/page/books path', function() {
            var path = '/page/books';
            it('should use the template /assets/html/books/books.tmpl.html', function() {
                expect(route.routes[path].templateUrl).toEqual('/assets/html/books/books.tmpl.html');
            });
            it('should use the booksCtrl controller', function() {
                expect(route.routes[path].controller).toBe('booksCtrl');
            });
        });

        describe('/page/static/* path', function() {
            it('should use the template /assets/html/static/*.tmpl.html', function() {
                expect(route.routes['/page/static/:name'].templateUrl({name: 'page1'}))
                    .toEqual('/assets/html/static/page1.tmpl.html');
                expect(route.routes['/page/static/:name'].templateUrl({name: 'page2'}))
                    .toEqual('/assets/html/static/page2.tmpl.html');
            });
        });

        describe('unknown path', function() {
            it('should redirect to /page/home', function() {
                expect(route.routes[null].redirectTo).toEqual('/page/home')
            });
        })

    });

});