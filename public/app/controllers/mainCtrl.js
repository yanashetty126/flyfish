angular.module('mainControllers', ['authServices'])

.controller('mainCtrl', function($http, $location, $timeout, Auth) {
	var app = this;
	this.doLogin = function(loginData) {
		app.errorMsg = false;
		app.successMsg = false;
		Auth.login(app.loginData).then(function(data) {
			if(data.data.success) {
				app.successMsg = data.data.message;
				$timeout(function() {
					$location.path('/dashboard');
				}, 2000);	
			} else {
				app.errorMsg = data.data.message;
			}
		});
	};
});