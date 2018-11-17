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

export { filter };
