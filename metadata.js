(function (global) {
  'use strict';

  var form = document.querySelector('form');
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var track = event.target[0].value.split(':')[2];
    fetchMetaData(track);
  });

  var fetchMetaData = function(track){
    var info = new XMLHttpRequest();
    var baseURL = "https://api.spotify.com/v1/tracks/";
    info.open('GET', baseURL + track);

    info.setRequestHeader('Accept', 'application/json');

    info.onload = function() {
      if (this.status === 200) {
        var response = JSON.parse(this.response);
        console.log('onload response', response);
        displayInfo(response);
      }
    };

    info.send();
  };

  var displayInfo = function(track) {
    document.querySelector('.title').innerHTML = track.name;
    document.querySelector('.author').innerHTML = track.artists[0].name;
    document.querySelector('.cover img').src = track.album.images[0].url;
    document.querySelector('#audio').src = track.preview_url;
  };

  var playMusic = document.querySelector('.btn-play');
  playMusic.addEventListener('click', function (event) {
    event.preventDefault();

    var song = document.querySelector('#audio');
    song.play();
  });

  var pauseMusic = document.querySelector('.btn-play');
  pauseMusic.addEventListener('click', function (event) {
    event.preventDefault();

    var song = document.querySelector('#audio');
    song.pause();
  })

})(window);
