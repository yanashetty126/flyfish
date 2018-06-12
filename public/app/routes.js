angular.module('appRoutes', ['ngRoute'])

.config(function ($routeProvider,$locationProvider) {
    $locationProvider.html5Mode({
    	enabled: true,
    	requireBase: false
    });

    $routeProvider

	.when('/', {
		templateUrl: 'app/views/pages/login.html'
	})

	.when('/register', {
		templateUrl: 'app/views/pages/register.html',
		controller: 'regCtrl',
		controllerAs: 'register'
	})

	.otherwise({ redirectTo: '/' })

});