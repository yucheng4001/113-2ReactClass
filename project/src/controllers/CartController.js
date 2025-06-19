/**
 * ============================================
 * 誠品電腦周邊 - 購物車控制器
 * Eslite Computer Peripherals - Cart Controller
 * ============================================
 * 
 * @description 購物車業務邏輯控制器，處理購物車相關操作
 * @author GitHub Copilot & Development Team
 * @version 1.0.0
 * @created 2025-06-19
 * @copyright © 2025 誠品電腦周邊. All rights reserved.
 * @license MIT License
 */

/**
 * 購物車項目資料模型
 * @class CartItem
 */
class CartItem {
  constructor(product, quantity) {
    this.product = product;
    this.quantity = quantity;
  }
}

/**
 * 購物車控制器類別
 * @class CartController
 * @description 管理購物車的所有業務邏輯操作
 */
export class CartController {
  constructor() {
    this.cartItems = [];
  }

  /**
   * 添加商品到購物車
   * @param {Object} product - 產品物件
   * @param {number} quantity - 數量（預設為1）
   * @returns {Array} 更新後的購物車項目陣列
   */
  addToCart(product, quantity = 1) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push(new CartItem(product, quantity));
    }
    return this.cartItems;
  }

  /**
   * 從購物車移除商品
   * @param {number} productId - 產品ID
   * @returns {Array} 更新後的購物車項目陣列
   */
  removeFromCart(productId) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    return this.cartItems;
  }

  /**
   * 更新購物車商品數量
   * @param {number} productId - 產品ID
   * @param {number} quantity - 新數量
   * @returns {Array} 更新後的購物車項目陣列
   */
  updateQuantity(productId, quantity) {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
    return this.cartItems;
  }

  /**
   * 獲取購物車所有項目
   * @returns {Array} 購物車項目陣列
   */
  getCartItems() {
    return this.cartItems;
  }

  /**
   * 計算購物車總價
   * @returns {number} 總價金額
   */
  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  }

  /**
   * 清空購物車
   * @returns {Array} 空的購物車項目陣列
   */
  clearCart() {
    this.cartItems = [];
    return this.cartItems;
  }
}

/* 
 * ============================================
 * 版權聲明 | Copyright Notice
 * ============================================
 * 
 * © 2025 誠品電腦周邊 版權所有
 * © 2025 Eslite Computer Peripherals. All rights reserved.
 * 
 * 本檔案包含購物車管理的核心業務邏輯
 * This file contains core business logic for cart management
 * 
 * ============================================
 */