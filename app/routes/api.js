var User     = require('../models/user');

module.exports = function(router) {
	//http://localhost:8080/users
	router.post('/users', function(req, res) {
		var user = new User();
		user.username = req.body.username;
		user.password = req.body.password;
		user.email = req.body.email;
		if(req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' || req.body.email == null || req.body.email == '') {
			res.json({success: false, message: 'All fields are required.'});
		} else {
			user.save(function(err){
				 if(err) {
				 	res.json({success: false, message: 'Username or Email already exists!'});
				 } else {
				 	res.json({success: true, message: 'user created!'});
				 }
			});
		}
	});

	router.post('/authenticate', function(req, res) {
		User.findOne({ username: req.body.username }).select('username email password').exec(function(err, user) {
			if(err) throw err;
			if(!user) {
				res.json({ success: false, message: 'Couldnot authenticate User.'});
			} else if (user) {
				if(req.body.password) {
					var validPassword = user.comparePassword(req.body.password);
					if(!validPassword) {
						res.json({success: false, message: 'Couldnot authenticate Password!'});
					} else {
					 	res.json({success: true, message: 'user authenticated!'});
					}
				} else {
					res.json({success: false, message: 'No password provided!'});
				}
			}
		});
	});
	return router;
}