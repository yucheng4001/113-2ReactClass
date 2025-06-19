/**
 * ============================================
 * 訂單控制器 - Order Controller
 * ============================================
 */

class Order {
  constructor(id, userId, username, email, items, totalAmount, shippingAddress, paymentMethod, status = 'pending', createdAt = new Date()) {
    this.id = id;
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.items = items; // 購物車商品
    this.totalAmount = totalAmount;
    this.shippingAddress = shippingAddress;
    this.paymentMethod = paymentMethod;
    this.status = status; // pending, confirmed, shipped, delivered, cancelled
    this.createdAt = createdAt;
  }
}

// 單例模式的訂單控制器
class OrderController {
  constructor() {
    if (OrderController.instance) {
      return OrderController.instance;
    }
    
    // 初始化一些測試訂單
    this.orders = [
      new Order(
        1,
        2,
        'user1',
        'user1@example.com',
        [
          { id: 1, name: '機械鍵盤', price: 2500, quantity: 1 },
          { id: 2, name: '遊戲滑鼠', price: 1200, quantity: 1 }
        ],
        3700,
        {
          name: '王小明',
          phone: '0912345678',
          address: '台北市信義區信義路五段7號',
          city: '台北市',
          postalCode: '110'
        },
        'credit_card',
        'confirmed',
        new Date('2025-01-10')
      )
    ];
    
    OrderController.instance = this;
  }

  /**
   * 創建新訂單
   */
  createOrder(orderData) {
    console.log('創建訂單:', orderData);
    
    const newOrder = new Order(
      Date.now(),
      orderData.userId,
      orderData.username,
      orderData.email,
      orderData.items,
      orderData.totalAmount,
      orderData.shippingAddress,
      orderData.paymentMethod,
      'pending',
      new Date()
    );

    this.orders.push(newOrder);
    console.log('訂單創建成功:', newOrder);
    return newOrder;
  }

  /**
   * 獲取所有訂單 (管理員用)
   */
  getAllOrders() {
    return this.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  /**
   * 根據用戶ID獲取訂單
   */
  getOrdersByUser(userId) {
    return this.orders.filter(order => order.userId === userId)
                     .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  /**
   * 根據ID獲取訂單
   */
  getOrderById(orderId) {
    return this.orders.find(order => order.id === orderId);
  }

  /**
   * 更新訂單狀態
   */
  updateOrderStatus(orderId, status) {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) {
      throw new Error('訂單不存在');
    }
    
    order.status = status;
    return order;
  }

  /**
   * 獲取訂單統計
   */
  getOrderStats() {
    const total = this.orders.length;
    const pending = this.orders.filter(o => o.status === 'pending').length;
    const confirmed = this.orders.filter(o => o.status === 'confirmed').length;
    const shipped = this.orders.filter(o => o.status === 'shipped').length;
    const delivered = this.orders.filter(o => o.status === 'delivered').length;
    
    // 計算總銷售額
    const totalRevenue = this.orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, order) => sum + order.totalAmount, 0);

    return {
      total,
      pending,
      confirmed,
      shipped,
      delivered,
      totalRevenue
    };
  }
}

// 創建單例實例
const orderController = new OrderController();

export { OrderController, orderController };