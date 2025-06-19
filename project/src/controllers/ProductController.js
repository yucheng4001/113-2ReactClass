class Product {
  constructor(id, name, category, price, description, image) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.price = price;
    this.description = description;
    this.image = image;
  }
}

export class ProductController {
  constructor() {
    this.products = [
      new Product(1, '機械鍵盤', '鍵盤', 2500, '高品質機械鍵盤', 'https://diz36nn4q02zr.cloudfront.net/webapi/imagesV3/Original/SalePage/9911925/0/638851150996430000?v=1'),
      new Product(2, '遊戲滑鼠', '滑鼠', 1200, '高精度遊戲滑鼠', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcu6TMUCYLBd9enb4ggLg2pBU3q_L972xXSw&s'),
      new Product(3, '4K螢幕', '螢幕', 8000, '27吋4K顯示器', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_0X2MubVxW9Xv4276RVJA8Igj2Z-bga6kxA&s'),
      new Product(4, '無線鍵盤', '鍵盤', 1800, '藍牙無線鍵盤', 'https://www.keychron.com.tw/cdn/shop/products/Keychron-K8-tenkeyless-wireless-mechanical-keyboard-for-Mac-Windows-iOS-RGB-white-backlight-with-Keychron-Optical-switch-brown_2a166320-0098-4506-8b20-2106e26f929b.jpg?v=1705017552&width=1214'),
      new Product(5, '電競滑鼠', '滑鼠', 1500, 'RGB電競滑鼠', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUm1aQ3ZTbVWAfeOSy6_1wBM4q-iA8W_pEfQ&s'),
      new Product(6, '曲面螢幕', '螢幕', 12000, '32吋曲面螢幕', 'https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c08894694.png'),
    ];
  }

  getAllProducts() {
    return this.products;
  }

  getProductsByCategory(category) {
    if (!category || category === '全部') {
      return this.products;
    }
    return this.products.filter(product => product.category === category);
  }

  getProductById(id) {
    return this.products.find(product => product.id === parseInt(id));
  }

  getCategories() {
    const categories = [...new Set(this.products.map(product => product.category))];
    return ['全部', ...categories];
  }

  addProduct(productData) {
    const newProduct = new Product(
      Date.now(),
      productData.name,
      productData.category,
      productData.price,
      productData.description,
      productData.image
    );
    this.products.push(newProduct);
    return newProduct;
  }

  deleteProduct(id) {
    this.products = this.products.filter(product => product.id !== parseInt(id));
    return true;
  }
}