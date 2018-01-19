require("dotenv").config();
var request = require("request");
var fs = require('fs');
var keys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var movieName = "";
var songName = "";
var defMovie = "Mr.Nobody";
var defSong = " The Sign"

var commandArray = ['my-tweets','spotify-this-song','movie-this', 'do-what-it-says'];

// Functions here

//Get data from twitter
function myTweets(){
  var params = {
    screen_name: 'eakta178',
    q: 'technology',
    count: 20
    } 
    client.get('search/tweets', params,searchedData); 
    function searchedData(err, data, response) {
    
    
    var myData = data.statuses;
    for (var i = 0; i < myData.length; i++) {
      console.log( myData[i].text);
      
      console.log('------------------------------');
    }

  }

}

//Get data from OMDB
function omddApi(){
  
  for (var i=3; i<process.argv.length; i++){
    movieName = movieName + " " + process.argv[i];
  }
  
  if(movieName === "")
  {
    movieName = defMovie;
  }

  console.log(movieName);

  var queryURL = "http://www.omdbapi.com/?t=" + movieName.trim()+ "&y=&plot=short&apikey=trilogy"
  
  request(queryURL, function(error, response, body) {

  if (!error && response.statusCode === 200) {

    console.log("The Title of the movie is: " + JSON.parse(body).Title);
    console.log("The Year the movie came out is: " + JSON.parse(body).Year);
    console.log("The IMDB Rating of the movie is: " + JSON.parse(body).imdbRating);
    console.log("The Rotten Tomatoes Rating of the movie is: " + JSON.parse(body).Ratings[1].Value);
    console.log("The Country where the movie was produced is: " + JSON.parse(body).Country);
    console.log("The Language of the movie is: " + JSON.parse(body).Language);
    console.log("The Plot of the movie is: " + JSON.parse(body).Plot);
    console.log("The Actors in the movie are: " + JSON.parse(body).Actors);
    }
  });
  }

  //Spotify Function
  function spotifyApi(){

    
    for (var i=3; i<process.argv.length; i++){
      songName = songName + " " + process.argv[i];
    }
    
    if(songName === "")
    {
      songName = defSong;
    }
  
    console.log(songName);

     spotify.search({ type: 'track', query: songName }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err)
      }
      
      var spotData = data.tracks.items;
      // console.log(spotData[0])
      for (var i = 0; i < spotData.length; i++) {
      console.log('The Artist(s) is/are: '+spotData[i].artists[0].name)
      console.log('The Song Name is: '+spotData[i].name)
      console.log('Here is the Preview Link: '+spotData[i].preview_url)
      console.log('The Album that the song is from: '+spotData[i].album.name)
      console.log('------------------------------')
    }
    })


  }

  //Get data from File

  function getDatafromFile(){
    fs.readFile("random.txt", "utf8", function(err, data) {
      if (err) {
        return console.log(err);
      }
      
      data = data.split(", ");

      console.log(data);
      

   
    });


  }

// Conditions based on commands here
switch(process.argv[2]){
    case commandArray[0]:
    myTweets();
    break;

    case commandArray[1]:
    spotifyApi()
    break;

    case commandArray[2]:
    omddApi();
    break;

    case commandArray[3]:
    getDatafromFile()
    break;
}

