
exports.index = function (req, res, next) {
    res.render('index', { title: 'ŞAHAN Company' });
}

exports.robotControl = function (req, res, next) {
    res.render('robotControl', { title: 'ŞAHAN Company' });
}