// TODO Test
angular.module('mainModule', [
    'ngRoute',
    'configModule',
    'booksModule'
])
.controller('mainCtrl', ['$scope',
    function ($scope) {
        $scope.themes = [
            {title: 'Slate (used by this application)', css: 'bootstrap_slate.min.css'},
            {title: 'Default Bootstrap', css: 'bootstrap.min.css'},
            {title: 'Amelia', css: 'bootstrap_amelia.min.css'},
            {title: 'Cerulean', css: 'bootstrap_cerulean.min.css'},
            {title: 'Cosmo', css: 'bootstrap_cosmo.min.css'},
            {title: 'Cyborg', css: 'bootstrap_cyborg.min.css'},
            {title: 'Darkly', css: 'bootstrap_darkly.min.css'},
            {title: 'Flatly', css: 'bootstrap_flatly.min.css'},
            {title: 'Journal', css: 'bootstrap_journal.min.css'},
            {title: 'Lumen', css: 'bootstrap_lumen.min.css'},
            {title: 'Readable', css: 'bootstrap_readable.min.css'},
            {title: 'Simplex', css: 'bootstrap_simplex.min.css'},
            {title: 'Spacelab', css: 'bootstrap_spacelab.min.css'},
            {title: 'Superhero', css: 'bootstrap_superhero.min.css'},
            {title: 'United', css: 'bootstrap_united.min.css'},
            {title: 'Yeti', css: 'bootstrap_yeti.min.css'}
        ];
        $scope.theme = $scope.themes[0].css;
        $scope.changeTheme = function(theme) {
            $scope.theme = theme;
        };
    }
]);