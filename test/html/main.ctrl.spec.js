describe('mainModule controllers', function() {

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
            it('should contain Slate', function() {
                expect(scope.themes).toContain({title: 'Slate (used by this application)', css: 'bootstrap_slate.min.css'});
            });
            it('should contain Default Bootstrap', function() {
                expect(scope.themes).toContain({title: 'Default Bootstrap', css: 'bootstrap.min.css'});
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
            it('should contain Flatly', function() {
                expect(scope.themes).toContain({title: 'Flatly', css: 'bootstrap_flatly.min.css'});
            });
            it('should contain Journal', function() {
                expect(scope.themes).toContain({title: 'Journal', css: 'bootstrap_journal.min.css'});
            });
            it('should contain Lumen', function() {
                expect(scope.themes).toContain({title: 'Lumen', css: 'bootstrap_lumen.min.css'});
            });
            it('should contain Readable', function() {
                expect(scope.themes).toContain({title: 'Readable', css: 'bootstrap_readable.min.css'});
            });
            it('should contain Simplex', function() {
                expect(scope.themes).toContain({title: 'Simplex', css: 'bootstrap_simplex.min.css'});
            });
            it('should contain Spacelab', function() {
                expect(scope.themes).toContain({title: 'Spacelab', css: 'bootstrap_spacelab.min.css'});
            });
            it('should contain Superhero', function() {
                expect(scope.themes).toContain({title: 'Superhero', css: 'bootstrap_superhero.min.css'});
            });
            it('should contain United', function() {
                expect(scope.themes).toContain({title: 'United', css: 'bootstrap_united.min.css'});
            });
            it('should contain Yeti', function() {
                expect(scope.themes).toContain({title: 'Yeti', css: 'bootstrap_yeti.min.css'});
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