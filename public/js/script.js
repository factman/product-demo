var slider = w3.slideshow(".slider", 5000);

function slideLeft() {
  slider.previous();
}

function slideRight() {
  slider.next();
}

// Add a "checked" symbol when clicking on a category item
var categories = document.querySelector('#categories');
categories.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

// Add a "checked" symbol when clicking on a colors item
var colors = document.querySelector('#colors');
colors.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);
