var twitterKeys = require('./keys.js');
var spotify = require('spotify');
var fs = require('fs');

var params = process.argv.slice(2);

switch(params[0]) {
  case "my-tweets":
    twitterCall(params[1]);
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

function twitterCall (arg) {

}

function omdbCall (arg) {

}

function doWhatItSays () {

}

function logIt () {

}