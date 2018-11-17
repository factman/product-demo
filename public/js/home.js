"use strict";

import fakeApi from "../../api/fakeApi.js";
import { filter } from "./utils.js";

const api = new fakeApi();
const filterObject = new filter();

w3.includeHTML(() => {

  if (location.search !== "") {
    const query = location.search.split("=");
    const str = decodeURIComponent(query[1].replace("+", " "));
    const data = api.searchProducts(str);
    document.getElementById("PageHeading").innerHTML = `Search Result's: <small>"${str}";</small>`;
    w3.displayObject("productBox", data);
    if (data.count === 0) document.getElementById("productBox").style.display = "none";
  } else {
    const data = api.getProducts();
    document.getElementById("PageHeading").innerHTML = "Product Listing";    
    w3.displayObject("productBox", data);
    if (data.count === 0) document.getElementById("productBox").style.display = "none";
  }

  w3.displayObject("categories", api.getCategories());
  w3.displayObject("colors", api.getColors());

  // Add a "checked" symbol when clicking on a category item
  const categories = document.querySelector("#categories");
  categories.addEventListener("click", (ev) => {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
      filterObject.toggleFilter(ev.target.innerHTML);
    }
    filterObject.filterProducts(".productBox");
  }, false);

  // Add a "checked" symbol when clicking on a colors item
  var colors = document.querySelector("#colors");
  colors.addEventListener("click", (ev) => {
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("checked");
      filterObject.toggleFilter(ev.target.innerHTML);
    }
    filterObject.filterProducts(".productBox");
  }, false);
  
  // Initializing the slider object
  const slider = w3.slideshow(".slider", 5000);

  // Slider Next Event
  document.getElementById("sliderNext").addEventListener("click", slider.next);
  // Slider Previous Event
  document.getElementById("sliderPrev").addEventListener("click", slider.previous);
});
