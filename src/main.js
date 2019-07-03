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

    let musicSearch = new MusicSearch();
    let promise = musicSearch.getArtistId(inputArtist);

  promise
    .then(function(result) {
      let output = JSON.parse(result);
      let artistId = output.message.body.artist_list[0].artist.artist_id;
      // $('.showArtistId').text(`The ID number of ${inputArtist} is ${artistId}.`);
      return musicSearch.getArtistAlbums(artistId);
    })
    .then(function(newResult){
      let output = JSON.parse(newResult);
      let albumList = output.message.body.album_list;
      for (var i = 0; i < albumList.length; i++) {
        $('.showArtistAlbums').append(`${albumList[i].album.album_name}<br>`)
      }
    })
    .catch(function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
