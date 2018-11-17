"use strict";

import fakeApi from "../../api/fakeApi.js";

const api = new fakeApi();

w3.includeHTML(() => {
  // Calling fakeApi for Product
  const query = location.search.split("=");
  const pid = query[1];
  const data = api.getProduct(pid);
  w3.displayObject("singleProduct", data);

  // Initializing the slider object
  const slider = w3.slideshow(".slider", 5000);

  // Slider Next Event
  document.getElementById("sliderNext").addEventListener("click", slider.next);
  // Slider Previous Event
  document.getElementById("sliderPrev").addEventListener("click", slider.previous);

  // Adding Events to the slider Thumbs
  const thumbs = document.getElementById("thumbs").children;
  Object.values(thumbs).map((thumb, index) => {
    thumb.addEventListener("click", () => {
      slider.display(index + 1);
    });
  });
});
