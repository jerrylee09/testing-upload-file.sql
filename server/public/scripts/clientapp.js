var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: '/views/partials/home.html',
            controller: "homeController"
        })
        .when('/upload', {
            templateUrl: '/views/partials/upload.html',
            controller: "uploadController"
        })
        .otherwise({
            redirectTo: 'home'
        });
}]);



