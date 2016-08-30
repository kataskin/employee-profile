var sliderScale = document.querySelector('.js-skills__scale');
var slider = sliderScale.querySelector('.js-skills__slider');
var startSliderPosition = sliderScale.querySelector('.js-skills__item--start');

var halfWidthSlider = slider.clientWidth / 2;

window.onload = startCoords;
window.onresize = startCoords;
sliderScale.addEventListener('click', newCoords);

function startCoords() {
  var startCoordsX = getCoords(startSliderPosition) - getCoords(sliderScale) - 4;

  slider.style.left = startCoordsX + 'px';
}

function newCoords(e) {
  var sliderCoords = getCoords(sliderScale);
  var newLeft = e.pageX - sliderCoords - halfWidthSlider;
  
  slider.style.left = newLeft + 'px';
}

slider.onmousedown = function(e) {
  var thumbCoords = getCoords(slider);
  var shiftX = e.pageX - thumbCoords;
  var sliderCoords = getCoords(sliderScale);

  document.onmousemove = function(e) {
    var newLeft = e.pageX - shiftX - sliderCoords;

    if (newLeft < - halfWidthSlider) {
      newLeft = - halfWidthSlider;
    }
    var rightEdge = sliderScale.offsetWidth - slider.offsetWidth + halfWidthSlider;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    slider.style.left = newLeft + 'px';
  }

  document.onmouseup = function() {
    document.onmousemove = document.onmouseup = null;
  };

  return false;
};

slider.ondragstart = function() {
  return false;
};

function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return box.left + pageXOffset;

}
