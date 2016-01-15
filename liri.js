var twitterKeys = require("./keys.js");
var spotify = require('spotify');

var params = process.argv.slice(2);

switch(params[0]) {
  case "my-tweets":
    twitterCall(params[1]);
    break;
  case "spotify-this-song":
    spotifyCall(params[1]);
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
}

function twitterCall (arg) {

}

function omdbCall (arg) {

}

function doWhatItSays () {

}

function logIt () {

}