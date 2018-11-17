class fakeApi {
  constructor() {
    this.products = JSON.parse(localStorage.getItem("products")) || [];

    if (this.products.length === 0) {
      this.init();
    }

    this.addProduct = this.addProduct.bind(this);
    this.getCategories = this.getCategories.bind(this);
    this.getColors = this.getColors.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getProduct = this.getProduct.bind(this);
    this.searchProducts = this.searchProducts.bind(this);
  }
  
  getProducts() {
    return {
      products: this.products,
      count: this.products.length,
    };
  }

  getProduct(pid) {
    const products = this.products.filter(product => product.id == pid);

    return products[0];
  }

  searchProducts(str) {
    const products = this.products.filter((product) => {
      const vals = Object.values(product).join().toUpperCase();
      if (vals.includes(str.toUpperCase())) return true;
      return false;
    });

    return {
      products,
      count: products.length,
    };
  }

  getCategories() {
    const categories = [];
    this.products.map((product) => {
      if (!categories.includes(product.category)) {
        categories.push(product.category);
      }
    });

    return {
      categories,
      count: categories.length,
    };
  }

  getColors() {
    const colors = [];
    this.products.map((product) => {
      if (!colors.includes(product.color)) {
        colors.push({ name: product.color });
      }
    });

    return {
      colors,
      count: colors.length,
    };
  }

  addProduct(product) {
    this.products.push(product);
    localStorage.setItem("products", JSON.stringify(this.products));
  }
  
  init() {
    let i = 1;
    const colors = ["", "Blue Black", "Dark Gray", "Deep Blue", "Ligth Gray", "Brown", "Blue"];

    while (i < colors.length) {
      this.addProduct({
        id: i,
        name: `Suit ${i}`,
        image: `public/images/suit-${i}.jpg`,
        price: `${i}0,000`,
        color: colors[i],
        category: "Suits",
      });
      i++;
    }
  }
}

export default fakeApi;
