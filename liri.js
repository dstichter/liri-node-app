var twitterKeys = require('./keys.js');
var spotify = require('spotify');
var fs = require('fs');
var request = require('request');
var twitter = require('twitter');

var rtKey = "nw8987u6xrradkrzuyjjdnmg"; 

var params = process.argv.slice(2);
var output;

switchFunction(params[0], params[1]);

function switchFunction (arg1, arg2) {
  switch(arg1) {
    case "my-tweets":
      twitterCall();
      break;
    case "spotify-this-song":
      if(arg2){
        spotifyCall(arg2);
      }
      else{
        spotifyCall("what’s my age again");
      }
      break;
    case "movie-this":
      omdbCall(arg2);
      break;
    case "do-what-it-says":
      doWhatItSays();
      break;
    default:
      console.log("my-tweets" + "\r\n" + "spotify-this-song" + "\r\n" + "movie-this" + "\r\n" + "do-what-it-says")

  }
}

function spotifyCall (arg) {
  spotify.search({ type: 'track', query: arg }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
    var albumInfo = data.tracks.items[0]
    output = "Artist: " + albumInfo.artists[0].name + "\r\n" + 
    "Album Name: " + albumInfo.album.name + "\r\n" + 
    "Song Name: " + albumInfo.name + "\r\n" + 
    "Preview: " + albumInfo.album.external_urls.spotify + "\r\n";
    console.log(output);
    logIt(output);
  });
}

function twitterCall () {
  var user = new twitter({
    consumer_key: twitterKeys.twitterKeys.consumer_key,
    consumer_secret: twitterKeys.twitterKeys.consumer_secret,
    access_token_key: twitterKeys.twitterKeys.access_token_key,
    access_token_secret: twitterKeys.twitterKeys.access_token_secret});
  user.get("statuses/user_timeline", {screen_name: 'stichter3414'}, function (error, data, response){
    var output = "";
    for(var i = 0; i < data.length; i++){
      output += data[i].text + "\r\n" + data[i].created_at + "\r\n" + "\r\n" 
    }
    console.log(output);
    logIt(output);
  });
}

function omdbCall (arg) {
  var urlRequest = "http://www.omdbapi.com/?t=" + arg.replace(/\s/g, "+") + "&y=&plot=short&r=json&tomatoes=true"
  request(urlRequest , function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var dataJSON = JSON.parse(body);
      output = "Title: " + dataJSON.Title + "\r\n" +
      "Year: " + dataJSON.Year + "\r\n" +
      "IMDB Rating: " + dataJSON.imdbRating + "\r\n" +
      "Country: " + dataJSON.Country + "\r\n" +
      "Language: " + dataJSON.Language + "\r\n" +
      "Plot: " + dataJSON.Plot + "\r\n" +
      "Actors: " + dataJSON.Actors + "\r\n" +
      'Tomato Rating: ' + dataJSON.tomatoRating + "\r\n" +
      'Tomato URL: ' + dataJSON.tomatoURL + "\r\n";
      console.log(output);
      logIt(output);
    }
  });
}

function doWhatItSays () {
  fs.readFile('random.txt', 'utf8', function (err, data){
    var output = data.split(',');
    switchFunction(output[0], output[1]);
  });
}

function logIt (data) {
  var output = params[0] + "\r\n";
  if(params[1]){
    output +=  params[1] + "\r\n";
  }
  if(data){
    output += data + "\r\n" + "-------------------------------";
  }
  fs.appendFile('log.txt', output, function (err){
      if(err){
        console.log(err);
      }
    });
}