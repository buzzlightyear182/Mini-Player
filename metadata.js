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
      }
    };

    info.send();
  };

})(window);
