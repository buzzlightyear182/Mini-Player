(function (global) {
  'use strict';

  var controls = document.querySelector('.btn-play');

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
        displayInfo(response);
      }
    };

    info.send();
  };

  var displayInfo = function(track) {
    document.querySelector('.title').innerHTML = track.name;
    document.querySelector('.author').innerHTML = track.artists[0].name;
    document.querySelector('.cover img').src = track.album.images[0].url;
    controls.classList.remove('disabled');
    controls.classList.add('playing');
    document.getElementById('audio').src = track.preview_url;
    document.getElementById('audio').play();
  };

  document.querySelector('.btn-play').addEventListener('click', function(event) {
    var audio = document.getElementById('audio');
    if (audio.paused && audio.duration) {
      this.classList.add('playing');
      audio.play();
    } else {
      this.classList.remove('playing');
      audio.pause();
    }
  });

  document.getElementById('audio').addEventListener('timeupdate', function(event) {
    var audio = document.getElementById('audio');
    document.querySelector('.seekbar progress').value = audio.currentTime;
  });

  // document.querySelector('form').addEventListener('submit', function (event) {
  //   event.preventDefault();
  //   var track = event.target[0].value.split(':')[2];
  //   fetchMetaData(track);
  // });

  // var fetchMetaData = function(track){
  //   var info = new XMLHttpRequest();
  //   var baseURL = "https://api.spotify.com/v1/tracks/";
  //   info.open('GET', baseURL + track);

  //   info.setRequestHeader('Accept', 'application/json');

  //   info.onload = function() {
  //     if (this.status === 200) {
  //       var response = JSON.parse(this.response);
  //       displayInfo(response);
  //     }
  //   };

  //   info.send();
  // };

  document.getElementById('Search').addEventListener('submit', function(event) {
    event.preventDefault();
    var query = event.target[0].value;
    searchItem(query);
  }
  );

  var searchItem = function(query){
    var searchRequest = new XMLHttpRequest();
    var base_url = "https://api.spotify.com/v1/search?q=";
    var searchURL = base_url + query + "&type=track&limit=5";
    searchRequest.open('GET', searchURL);

    searchRequest.setRequestHeader('Accept','application/json');

    searchRequest.onload = function () {
      if (this.status === 200) {
        var results = JSON.parse(this.response);
        console.log(results);
      }
    };

    searchRequest.send();
  };

})(window);
