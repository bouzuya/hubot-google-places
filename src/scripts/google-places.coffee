# Description
#   A Hubot script that search google places
#
# Configuration:
#   HUBOT_GOOGLE_PLACES_API_KEY
#   HUBOT_GOOGLE_PLACES_LOCATION
#
# Commands:
#   hubot google-places <keyword> - search google places
#
# Author:
#   bouzuya <m@bouzuya.net>
#
module.exports = (robot) ->
  robot.respond /google-places (.+)$/i, (res) ->
    API_KEY = process.env.HUBOT_GOOGLE_PLACES_API_KEY
    LOCATION = process.env.HUBOT_GOOGLE_PLACES_LOCATION ? '34.694506,135.194850'
    RADIUS = 50000
    keyword = res.match[1]

    query =
      key: API_KEY
      location: LOCATION
      radius: RADIUS
      sensor: false
      language: 'ja'
      keyword: encodeURIComponent(keyword)
    qs = ("#{k}=#{v}" for k, v of query).join '&'
    url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?' + qs
    res.http(url).get() (err, _, body) ->
      return res.send(err) if err?
      {results} = JSON.parse body
      return res.send('no results') unless results.length > 0
      message = results.map (r) ->
        "#{r.name} #{r.geometry.location.lat},#{r.geometry.location.lng}"
      .join '\n'
      reference = results[0].reference
      query =
        key: API_KEY
        reference: reference
        sensor: false
        language: 'ja'
      qs = ("#{k}=#{v}" for k, v of query).join '&'
      url = 'https://maps.googleapis.com/maps/api/place/details/json?' + qs
      res.http(url).get() (err, _, body) ->
        return res.send(err) if err?
        {result} = JSON.parse body
        res.send """
          #{message}
          -----
          名前: #{result.name ? ''}
          住所: #{result.vicinity ? ''}
          電話番号: #{result.formatted_phone_number ? ''}
          URL: #{result.url ? ''}
        """
