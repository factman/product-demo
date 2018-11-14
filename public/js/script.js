"use strict";

class filter {
  constructor () {
    this.filters = [];
    this.filterProducts = this.filterProducts.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }
  
  toggleFilter (str) {
    if (this.filters.includes(str)) {
      this.filters.splice(this.filters.indexOf(str), 1);
    } else {
      this.filters.push(str);
    }
  }

  filterProducts (sel) {
    let a, i, hit;
    a = document.querySelectorAll(sel);
    for (i = 0; i < a.length; i++) {
      hit = 0;
      this.filters.map((filter) => {
        if (a[i].innerHTML.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
          hit = 1;
        }
      });

      if (hit == 1) {
        a[i].style.display = "";
      } else {
        if (this.filters.length > 0) {
          a[i].style.display = "none";
        } else {
          a[i].style.display = "";
        }
      }
    }
  }
}

const filterObject = new filter();

w3.includeHTML(() => {
  // Call fake api
  fetch("api/fakeApi.js")
    .then(res => res.text()
      .then((text) => {
        return eval(text);
      }))
    .then((api) => {

      if (location.search !== "") {
        const query = location.search.split("=");
        const str = decodeURIComponent(query[1].replace("+", " "));
        const data = api.searchProducts(str);
        w3.displayObject("productBox", data);
        if (data.count === 0) document.getElementById("productBox").style.display = "none";
      } else {
        const data = api.getProducts();
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
    })
    .catch((ex) => {
      return ex.message;
    });
  
  // Initializing the slider object
  const slider = w3.slideshow(".slider", 5000);
  slider.start();
});
