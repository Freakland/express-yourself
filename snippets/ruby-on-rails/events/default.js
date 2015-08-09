module.exports.bind = function(app) {

    app.on({
        'all /': require('../operations/index')
    });

};
