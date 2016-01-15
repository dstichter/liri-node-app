var twitterKeys = require('./keys.js');
var spotify = require('spotify');
var fs = require('fs');
var request = require('request');
var twitter = require('twitter');

var rtKey = "nw8987u6xrradkrzuyjjdnmg"; 

var params = process.argv.slice(2);

switch(params[0]) {
  case "my-tweets":
    twitterCall();
    break;
  case "spotify-this-song":
    if(params[1]){
      spotifyCall(params[1]);
    }
    else{
      spotifyCall("what’s my age again")
    }
    break;
  case "movie_this":
    omdbCall(params[1]);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
}

function spotifyCall (arg) {
  spotify.search({ type: 'track', query: arg }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    var albumInfo = data.tracks.items[0]
    console.log("Artist: " + albumInfo.artists[0].name)
    console.log("Album Name: " + albumInfo.album.name)
    console.log("Song Name: " + albumInfo.name)
    console.log("Preview: " + albumInfo.album.external_urls.spotify)
  });
}

function twitterCall () {
  var user = new twitter({
    consumer_key: twitterKeys.twitterKeys.consumer_key,
    consumer_secret: twitterKeys.twitterKeys.consumer_secret,
    access_token_key: twitterKeys.twitterKeys.access_token_key,
    access_token_secret: twitterKeys.twitterKeys.access_token_secret})
  user.get("statuses/user_timeline", {screen_name: 'stichter3414'}, function (error, data, response){
    for(var i = 0; i < data.length; i++){
      console.log(data[i].text);
      console.log(data[i].created_at);
      console.log();
    }

  });
}

function omdbCall (arg) {
  var urlRequest = "http://www.omdbapi.com/?t=" + arg.replace(/\s/g, "+") + "&y=&plot=short&r=json"
  request(urlRequest , function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var dataJSON = JSON.parse(body)
      console.log("Title: " + dataJSON.Title)
      console.log("Year: " + dataJSON.Year)
      console.log("IMDB Rating: " + dataJSON.imdbRating)
      console.log("Country: " + dataJSON.Country)
      console.log("Language: " + dataJSON.Language)
      console.log("Plot: " + dataJSON.Plot)
      console.log("Actors: " + dataJSON.Actors)
    }
  });
  urlRequest = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=[" + rtKey + "]&q=" + arg.replace(/\s/g, "+") + "&page_limit=1"
  request(urlRequest , function (error, response, body) {
    if (!error && response.statusCode == 200) {
      dataJSON = JSON.parse(body)
    }
    console.log(body)
  });
}

function doWhatItSays () {

}

function logIt () {

}