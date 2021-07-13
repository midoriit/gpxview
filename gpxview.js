function viewFile() {
  var gpx = document.querySelector('#gpxFile').files[0];
  var reader = new FileReader();
  reader.readAsText(gpx);
  reader.onload = function() {
    var logtable = document.querySelector('#logtable');
    logtable.innerHTML='<tr><th>time</th><th>lat</th><th>lon</th></tr>';
    var xml = reader.result;
    var parser = new DOMParser();
    var dom = parser.parseFromString(xml, 'text/xml');
    var tracks = dom.querySelectorAll('trkpt');
    for(var i=0; i<tracks.length; i++) {
      var track = tracks.item(i);
      var lat = track.getAttribute('lat');
      var lon = track.getAttribute('lon');
      var time, u_time, l_time;
      time = track.getElementsByTagName('time');
      if( time.length > 0 ) {
        u_time = time[0].textContent;
        l_time = new Date(u_time).toLocaleString();
      } else {
        l_time = '';
      }
      var newRow = logtable.insertRow(-1);
      var newCol1 = newRow.insertCell(0);
      newCol1.appendChild(document.createTextNode(l_time));
      var newCol2 = newRow.insertCell(1);
      newCol2.appendChild(document.createTextNode(lat));
      var newCol3 = newRow.insertCell(2);
      newCol3.appendChild(document.createTextNode(lon));
    };
  };
};
