golf = document.querySelectorAll('video, img[src$="gif"]');
for (hotel of golf) {
  if (hotel.src) {
    hotel.style.borderRight = '1em solid green';
    hotel.onclick = function(){this.src = this.src};
  }
  else {
    hotel.removeAttribute('loop');
    hotel.style.borderRight = '1em solid violet';
    hotel.onclick = function(){this.play()};
  }
}
