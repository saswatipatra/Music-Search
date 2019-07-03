import './styles.css';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MusicSearch } from './backend-code';

$(document).ready(function() {
  $('form').submit(function(event) {
    event.preventDefault();

    let inputArtist = $('#inputArtist').val();
    $('#inputArtist').val("");


    let musicSearch = new MusicSearch();  // create instance of WeatherService class
    let promise = musicSearch.getArtistId(inputArtist);  // call the instance method and pass in user input

    promise.then(function(response) {
      console.log('response: ', response);
      let output = JSON.parse(response);
      console.log(output);
      $('.showArtistId').text(`The ID number of ${inputArtist} is ${output.message.body.artist_list[0].artist.artist_id}, and the associated artist name in the database is ${output.message.body.artist_list[0].artist.artist_name}.`);
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });

});
