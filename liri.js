
require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var request = require('request');
var fs = require("fs");
var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);
var command = process.argv[2]


// Switch statement
switch(command) {
    case `my-tweets`:
        runTwitter();
    case `spotify-this-song`:
        runSpotify(fullInput());
        break;
    case `movie-this`:
        runMovie(fullInput());
        break;
    case `do-what-it-says`:
        runDoWhatItSays();
        break;
    default:
        console.log("Liri didnt understand, try using one of the folloing commands")
        console.log("------------------------------------")
        console.log("my-tweets");
        console.log("spotify-this-song `Your song title`");
        console.log("movie-this `Your Movie Title`")
        console.log(`do-what-it-says`);
}

function fullInput() {
    var userInput = process.argv[3];
    for (var i = 4; i < process.argv.length; i++) {
        userInput = userInput + " " + process.argv[i];
    }
    return userInput;
}
// TWITTER

function runTwitter() {
    var params = { screen_name: 'sltrib' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            tweets.forEach(function (element) {
                console.log("\n=================================\n" + element.created_at);
                console.log(element.text);
            });
        }
    });
}


// SPOTIFY

function runSpotify(songTitle) {

    //check for user input
    if(songTitle === null || typeof songTitle === 'undefined' || songTitle === undefined ){
        songTitle = "The+Sign";
    }    
    
    spotify.search({ type: 'track', query: songTitle }, function(err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
    } 
    for (i = 0; i < data.tracks.items.length; i++) {
        // console.log(data.tracks.items[1])
        console.log("-----------------------------");
        console.log("Song-Title:" + songTitle);
        console.log("Artist Name: " + data.tracks.items[i].album.artists[0].name);
        console.log("Link to Spotify: " + data.tracks.items[i].external_urls.spotify);
        console.log("Album Title: "+ data.tracks.items[i].album.name)
        console.log("----------------------------");
        }
    });
}

// OMD MOVIE SEARCH
function runMovie(movieTitle) {
    // /check for user input
    if(movieTitle === null || typeof movieTitle === 'undefined' || movieTitle === undefined ){
        movieTitle = "Mr. Nobody";
    } 
    // Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&y=&plot=short&apikey=trilogy";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("----------------------------------------")
    console.log("Movie Title: " + JSON.parse(body).Title)
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("Movie Rating: " + JSON.parse(body).Rated);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value )
    console.log("Country Where Movie Was Produced: " + JSON.parse(body).Country)
    console.log("Language Produced: " + JSON.parse(body).Language)
    console.log("Movie Plot: " + JSON.parse(body).Plot)
    console.log("List of Actors: " + JSON.parse(body).Actors)
    console.log("------------------------------------------")

  }
});
}


// DO WHAT IT SAYS COMMAND 
function runDoWhatItSays() {
    console.log("doing it");

    fs.readFile("random.txt", "utf8", function(error, data){
        if (error) {
            return console.log(error);
        }
 
        var randomChoice = data.split(",");
        console.log(randomChoice);
        if(randomChoice[0] === "spotify-this-song") {
            runSpotify(randomChoice[1]);
        }
        
    })
}
// do-what-it-says = (command = node liri do-what-it-says)
 
// should utilize the random.txt folder to spotify the song "I want it that way"




// BONUS: Log the data to the terminal bash window, output the data to the file log.txt.
// * Make sure you append each command you run to the `log.txt` file. 

