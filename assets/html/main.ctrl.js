angular.module('mainModule', [
    'ngRoute',
    'configModule',
    'homeModule',
    'booksModule'
])
.controller('mainCtrl', ['$scope',
    function ($scope) {
        $scope.themes = [
            {title: 'Default', css: 'bootstrap.min.css'},
            {title: 'Amelia', css: 'bootstrap_amelia.min.css'},
            {title: 'Cerulean', css: 'bootstrap_cerulean.min.css'},
            {title: 'Cosmo', css: 'bootstrap_cosmo.min.css'},
            {title: 'Cyborg', css: 'bootstrap_cyborg.min.css'},
            {title: 'Darkly', css: 'bootstrap_darkly.min.css'}
        ];
        $scope.theme = $scope.themes[0].css;
        $scope.changeTheme = function(theme) {
            $scope.theme = theme;
        }
    }
]);