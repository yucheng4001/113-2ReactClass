export class Product {
  constructor(id, name, category, price, description, image) {
    this.id = id;
    this.name = name;
    this.category = category; // 鍵盤, 滑鼠, 螢幕
    this.price = price;
    this.description = description;
    this.image = image;
  }
}

export class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }
}

export class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}