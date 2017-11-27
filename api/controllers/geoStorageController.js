'use strict';


var mongoose = require('mongoose'),
    Sign = mongoose.model('Sign');

function isValidLocationCoordinate(lat, lng) {
    return !isNaN(lat) && !isNaN(lng) && isLatitude(lat) && isLongitude(lng);
}

function isLatitude(lat) {
    return isFinite(lat) && Math.abs(lat) <= 90;
}

function isLongitude(lng) {
    return isFinite(lng) && Math.abs(lng) <= 180;
}

var milesToRadian = function(miles) {
    var earthRadiusInMiles = 3959;
    return miles / earthRadiusInMiles;
};

exports.list_all_signs = function(req, res) {
    Sign.find({}, function(err, sign) {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }
        res.json(sign);
    });
};

exports.find_within_distance = function(req, res) {
    //Validate input
    if (isNaN(req.query.radius) || !isValidLocationCoordinate(req.query.lat, req.query.lng)) {
        console.log("Invalid parameters to find signs within distance");
        res.status(400).send('Invalid parameters!');
        return;
    }

    var query = Sign.find({
        'loc': {
            $geoWithin: {
                $centerSphere: [
                    [req.query.lng, req.query.lat], milesToRadian(req.query.radius)
                ]
            }
        }
    });

    query.exec(function(err, sign) {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }

        if (!sign) {
            res.json({});
        } else {
            res.json(sign);
        }

    });
};


exports.create_a_sign = function(req, res) {
    //Validate input
    if (!isValidLocationCoordinate(req.body.lat, req.body.lng) || !req.body.name || (req.body.name.length == 0)) {
        console.log("Invalid parameters to create sign");
        res.status(400).send('Invalid parameters!');
        return;
    }

    var query = {
        'loc': [req.body.lng, req.body.lat]
    };
    Sign.findOneAndUpdate(query, req.body, {
        upsert: true
    }, function(err, sign) {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }
        res.json(sign);
    });
};

exports.find_distinct_type = function(req, res) {

    Sign.distinct('name', function(err, sing_types) {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }
        res.json(sing_types);
    });
};