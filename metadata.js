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
    document.querySelector('.seekbar progress').value = this.currentTime;
  });

  document.getElementById('audio').addEventListener('ended', function(event) {
    document.querySelector('.seekbar progress').value = 0;
    document.querySelector('.btn-play').classList.remove('playing');
  });

  document.querySelector('#results').addEventListener('click', function(event) {
    event.preventDefault();
    if (event.target.nodeName === 'A') {
      fetchMetaData(event.target.href.split(':')[2]);
    } else if (event.target.nodeName === 'SPAN') {
      fetchMetaData(event.target.parentElement.href.split(':')[2]);
    }
  });

  document.getElementById('Search').addEventListener('submit', function(event) {
    event.preventDefault();
    var query = event.target[0].value;
    searchItem(query);
  });

  var concatArtists = function(a) {
    return a.length === 1 ? a[0].name : a.reduce(function(previous, next) {
      if (previous.name) {
        return previous.name + ', ' + next.name;
      }

      return previous + ', ' + next.name;
    });
  };

  var updateList = function(songs) {
    var element = document.getElementById('results');
    element.innerHTML = "";

    for (var i = 0; i < songs.length; i++) {
      var el = document.createElement('li');
      var anchor = document.createElement('a');
      var artist = document.createElement('span');
      var song = document.createElement('span');
      var cover = document.createElement('img');

      var artist_text = concatArtists(songs[i].artists);

      artist.classList.add('artist');
      artist.innerHTML = artist_text;

      song.classList.add('song');
      song.innerHTML = songs[i].name;

      anchor.appendChild(artist);
      anchor.appendChild(song);
      anchor.href = songs[i].uri;
      el.appendChild(anchor);
      element.appendChild(el);
    }

    element.classList.remove('empty');
  };

  var searchItem = function(query) {
    var searchRequest = new XMLHttpRequest();
    var base_url = "https://api.spotify.com/v1/search?q=";
    var searchURL = base_url + encodeURIComponent(query) + "&type=track&limit=3";
    searchRequest.open('GET', searchURL);

    searchRequest.setRequestHeader('Accept','application/json');

    searchRequest.onload = function () {
      if (this.status === 200) {
        var results = JSON.parse(this.response);
        updateList(results.tracks.items);
      }
    };

    searchRequest.send();
  };

})(window);
