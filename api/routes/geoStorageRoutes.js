'use strict';
module.exports = function(app) {
    var geoStorage = require('../controllers/geoStorageController');

    // sign observation service routes
    app.route('/geostore')
        .get(geoStorage.list_all_signs)
        .post(geoStorage.create_a_sign);

    app.route('/geostore/find')
        .get(geoStorage.find_within_distance);

    app.route('/geostore/find/distincttype')
        .get(geoStorage.find_distinct_type);
};