function get_query_var(querystring, name) {
  var filter = new RegExp(name + '=([^&]+)');
  return unescape(querystring.match(filter)[1]);
}

function get_quality(url) {
  var qual = {
    5: '240p FLV h.263',
    17: '144p 3GP mpeg4',
    18: '360p MP4 h.264',
    22: '720p MP4 h.264',
    34: '360p FLV h.264',
    35: '480p FLV h.264',
    36: '240p 3GP mpeg4',
    37: '1080p MP4 h.264',
    43: '360p WebM vp8',
    44: '480p WebM vp8',
    45: '720p WebM vp8',
    46: '1080p WebM vp8',
    82: '360p MP4 3D',
    84: '720p MP4 3D',
    100: '360p WebM 3D',
    102: '720p WebM 3D',
    133: '240p MP4 DASH',
    134: '360p MP4 DASH',
    135: '480p MP4 DASH',
    136: '720p MP4 DASH',
    137: '1080p MP4 DASH',
    139: '48k M4A DASH',
    140: '128k M4A DASH',
    141: '256k M4A DASH',
    160: '192p MP4 DASH',
    171: '128k WebM DASH',
    172: '256k WebM DASH'
  };
  var k = url.match(/itag=(\d+)/)[1];
  return qual[k] || k;
}

var z;
var href;
var qq;
var fmts;
var urls = [];
var args = ytplayer.config.args;

/* get "url_encoded_fmt_stream_map" querystring */
fmts = args.url_encoded_fmt_stream_map.split(',');
for (z = 0; z < fmts.length; z++) {
  qq = get_quality(fmts[z]);
  href =            get_query_var(fmts[z], 'url') +
    '&signature=' + get_query_var(fmts[z], 'sig') +
    '&title='     + args.title + ' ' + qq;
  urls.push('<a href="' + href + '">' + qq + '</a>');
}

/* get "adaptive_fmts" querystring */
fmts = args.adaptive_fmts ? args.adaptive_fmts.split(',') : '';
for (z = 0; z < fmts.length; z++) {
  qq = get_quality(fmts[z]);
  href =        get_query_var(fmts[z], 'url') +
    '&title=' + args.title + ' ' + qq;
  urls += '<a href="' + href + '">' + qq + '</a><br>';
}

document.body.insertAdjacentHTML(
  'beforebegin',
  urls.join('<br>')
);
