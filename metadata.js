(function (global) {
  'use strict';

  document.querySelector('form').addEventListener('submit', function (event) {
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
    document.querySelector('.btn-play').classList.remove('disabled');
  };

  document.querySelector('.btn-play').addEventListener('click', function(event) {
    var audio = document.querySelector('#audio');
    var controls = document.querySelector('.btn-play');
    if (audio.paused) {
      controls.classList.add('playing');
      audio.play();
    } else {
      controls.classList.remove('playing');
      audio.pause();
    }
  });

})(window);
