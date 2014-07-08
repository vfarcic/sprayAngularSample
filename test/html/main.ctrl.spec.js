describe('mainModule controllers', function() {

    var route, httpBackend;

    beforeEach(module('mainModule'));

    describe('mainCtrl controller', function() {

        var scope;

        beforeEach(
            inject(function($rootScope, $injector, $controller) {
                scope = $rootScope.$new();
                $controller("mainCtrl", {
                    $scope: scope
                });
            })
        );

        describe('themes', function() {
            it('should be defined', function() {
                expect(scope.themes).toBeDefined();
            });
            it('should contain Default', function() {
                expect(scope.themes).toContain({title: 'Default', css: 'bootstrap.min.css'});
            });
            it('should contain Amelia', function() {
                expect(scope.themes).toContain({title: 'Amelia', css: 'bootstrap_amelia.min.css'});
            });
            it('should contain Cerulean', function() {
                expect(scope.themes).toContain({title: 'Cerulean', css: 'bootstrap_cerulean.min.css'});
            });
            it('should contain Cosmo', function() {
                expect(scope.themes).toContain({title: 'Cosmo', css: 'bootstrap_cosmo.min.css'});
            });
            it('should contain Cyborg', function() {
                expect(scope.themes).toContain({title: 'Cyborg', css: 'bootstrap_cyborg.min.css'});
            });
            it('should contain Darkly', function() {
                expect(scope.themes).toContain({title: 'Darkly', css: 'bootstrap_darkly.min.css'});
            });
        });

        describe('theme', function() {
            it('should have first css item from themes set by default', function() {
                expect(scope.theme).toEqual(scope.themes[0].css);
            });
        });

        describe('changeTheme(theme)', function() {
            it('should set value to the theme', function() {
                var theme = 'newTheme';
                scope.changeTheme(theme);
                expect(scope.theme).toEqual(theme)
            });
        });

    });

});