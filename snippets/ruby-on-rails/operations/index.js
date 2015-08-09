var expressify = require('expressify'),
	Operation = expressify.Operation;

module.exports = Operation.extend({
	read: function(req, res) {
		res.render('index', {
			title: 'Express'
		});
	}
});
