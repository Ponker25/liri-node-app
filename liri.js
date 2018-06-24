console.log("liri.js is loaded");

var dotenv = require("dotenv").config();

var apiList = require("./keys.js");

var request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

// TWITTER

var Twitter = require('twitter');
// my tweets (will show the last 20 tweets) command = node liri.js my-tweets
  var params = {screen_name: 'nodejs'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
  });

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

console.log("this is a test");
console.log(Twitter)

// SPOTIFY

// var Spotify = require('node-spotify-api');
//  spotify this song = (Show Artists, The Song Name, A preview link of the song from spotify, the Album, IF NO SONG DEFAULT TO "The Sign" by Ace of Base.)

// var spotify = new Spotify({
//   id: <your spotify client id>,
//   secret: <your spotify client secret>
// });
 
// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//      console.log('Error occurred: ' + err);
//   }
 
// console.log(data); 
// });


// OMD MOVIE SEARCH
// movie-this (command = node liri.js <movie name here>)

// var request = require("request");

// // Grab the movieName which will always be the third node argument.
// var movieName = process.argv[2];

// // Then run a request to the OMDB API with the movie specified
// var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

// // This line is just to help us debug against the actual URL.
// console.log(queryUrl);

// request(queryUrl, function(error, response, body) {

//   // If the request is successful
//   if (!error && response.statusCode === 200) {

//     // Parse the body of the site and recover just the imdbRating
//     // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//     console.log("Release Year: " + JSON.parse(body).Year);
//   }
// });

// DO WHAT IT SAYS COMMAND 
// do-what-it-says = (command = node liri do-what-it-says)
 
// should utilize the random.txt folder to spotify the song "I want it that way"




// BONUS: Log the data to the terminal bash window, output the data to the file log.txt.
// * Make sure you append each command you run to the `log.txt` file. 

// * Do not overwrite your file each time you run a command.