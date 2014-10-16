// Description
//   A Hubot script that search google places
//
// Configuration:
//   HUBOT_GOOGLE_PLACES_API_KEY
//   HUBOT_GOOGLE_PLACES_LOCATION
//
// Commands:
//   hubot google-places <keyword> - search google places
//
// Author:
//   bouzuya <m@bouzuya.net>
//
module.exports = function(robot) {
  return robot.respond(/google-places (.+)$/i, function(res) {
    var API_KEY, LOCATION, RADIUS, k, keyword, qs, query, url, v, _ref;
    API_KEY = process.env.HUBOT_GOOGLE_PLACES_API_KEY;
    LOCATION = (_ref = process.env.HUBOT_GOOGLE_PLACES_LOCATION) != null ? _ref : '34.694506,135.194850';
    RADIUS = 50000;
    keyword = res.match[1];
    query = {
      key: API_KEY,
      location: LOCATION,
      radius: RADIUS,
      sensor: false,
      language: 'ja',
      keyword: encodeURIComponent(keyword)
    };
    qs = ((function() {
      var _results;
      _results = [];
      for (k in query) {
        v = query[k];
        _results.push("" + k + "=" + v);
      }
      return _results;
    })()).join('&');
    url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + qs;
    return res.http(url).get()(function(err, _, body) {
      var message, reference, results;
      if (err != null) {
        return res.send(err);
      }
      results = JSON.parse(body).results;
      if (!(results.length > 0)) {
        return res.send('no results');
      }
      message = results.map(function(r) {
        return "" + r.name + " " + r.geometry.location.lat + "," + r.geometry.location.lng;
      }).join('\n');
      reference = results[0].reference;
      query = {
        key: API_KEY,
        reference: reference,
        sensor: false,
        language: 'ja'
      };
      qs = ((function() {
        var _results;
        _results = [];
        for (k in query) {
          v = query[k];
          _results.push("" + k + "=" + v);
        }
        return _results;
      })()).join('&');
      url = 'https://maps.googleapis.com/maps/api/place/details/json?' + qs;
      return res.http(url).get()(function(err, _, body) {
        var result, _ref1, _ref2, _ref3, _ref4;
        if (err != null) {
          return res.send(err);
        }
        result = JSON.parse(body).result;
        return res.send("" + message + "\n-----\n名前: " + ((_ref1 = result.name) != null ? _ref1 : '') + "\n住所: " + ((_ref2 = result.vicinity) != null ? _ref2 : '') + "\n電話番号: " + ((_ref3 = result.formatted_phone_number) != null ? _ref3 : '') + "\nURL: " + ((_ref4 = result.url) != null ? _ref4 : ''));
      });
    });
  });
};
