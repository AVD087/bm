function qr(sr) {
  var qa = [];
  for (var prs of sr.split('&')) {
    var pra = prs.split('=');
    qa[pra[0]] = pra[1];
  }
  return qa;
}

function get_quality(url) {
  var qual = {
    5: '240p FLV h263',
    17: '144p 3GP mpeg4',
    18: '360p MP4 h264',
    22: '720p MP4 h264',
    34: '360p FLV h264',
    35: '480p FLV h264',
    36: '240p 3GP mpeg4',
    37: '1080p MP4 h264',
    43: '360p WebM vp8',
    44: '480p WebM vp8',
    45: '720p WebM vp8',
    46: '1080p WebM vp8',
    82: '360p MP4 3D',
    84: '720p MP4 3D',
    100: '360p WebM 3D',
    102: '720p WebM 3D',
    133: '240p DASH h264',
    134: '360p DASH h264',
    135: '480p DASH h264',
    136: '720p DASH h264',
    137: '1080p DASH h264',
    139: '48k DASH AAC',
    140: '128k DASH AAC',
    141: '256k DASH AAC',
    160: '192p DASH h264',
    171: '128k DASH vorbis',
    172: '192k DASH vorbis'
  };
  var qs = qr(url);
  var itag = qs['itag'];
  return qual[itag] || itag;
}

function rp(tx) {
  return tx.replace('"', '&quot;', 'g');
}

function dj(a) {
  a = a.split('');
  a = a.slice(2);
  a = a.reverse();
  a = a.slice(3);
  a = ej(a, 9);
  a = a.slice(3);
  a = ej(a, 43);
  a = a.slice(3);
  a = a.reverse();
  a = ej(a, 23);
  return a.join('');
}

function ej(a, b) {
  var c = a[0];
  a[0] = a[b % a.length];
  a[b] = c;
  return a;
}

function dc(frm) {
  var qs = qr(frm);
  var furl = qs['url'];
  if (qs['sig'])
    furl += '&signature=' + qs['sig'];
  if (qs['s']) {
    furl += '&signature=' + dj(qs['s']);
  }
  return unescape(furl);
}

var args = ytplayer.config.args;
var html = [
    new Date().toLocaleString(),
    'Click to copy the filename, then right click to download'
];

for (var ft of [args.url_encoded_fmt_stream_map, args.adaptive_fmts]) {
  for (var z of ft ? ft.split(',') : '') {
    var qq = get_quality(z);
    var href = dc(z);
    var onclick = 'prompt("","' + args.title + ' ' + qq + '");return false';
    html.push(
      '<a href="' + href + '" onclick="' + rp(onclick) + '">' + qq + '</a>'
    );
  }
}

var dw = document.querySelector('#bm');

if (!dw) {
  dw = document.createElement('div');
  dw.id = 'bm';
  document.body.insertBefore(dw, document.body.firstChild);
}

dw.innerHTML = html.join('<br>');
