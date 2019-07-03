import 'jquery';

export class MusicSearch {
  getArtistId(artistName) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/artist.search?q_artist=${artistName}&apikey=${process.env.API_KEY}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }

  getArtistAlbums(artistId) {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://cors-anywhere.herokuapp.com/api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=${artistId}&g_album_name=1&s_release_date=desc&apikey=${process.env.API_KEY}`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}
