/**
 * ============================================
 * 用戶控制器 - User Controller
 * ============================================
 */

class User {
  constructor(id, username, email, password, createdAt = new Date()) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
  }
}

// 創建一個單例模式的用戶控制器
class UserController {
  constructor() {
    if (UserController.instance) {
      return UserController.instance;
    }
    
    // 初始化用戶數據
    this.users = [
      new User(1, 'admin', 'admin@example.com', 'admin123', new Date('2025-01-01')),
      new User(2, 'user1', 'user1@example.com', 'password123', new Date('2025-01-01'))
    ];
    
    UserController.instance = this;
  }

  /**
   * 獲取所有用戶
   * @returns {Array} 所有用戶陣列
   */
  getAllUsers() {
    return this.users;
  }

  /**
   * 註冊新用戶
   */
  register(userData) {
    console.log('正在註冊用戶:', userData); // 調試用
    
    const existingUser = this.users.find(
      user => user.username === userData.username || user.email === userData.email
    );

    if (existingUser) {
      throw new Error('用戶名或電子郵件已存在');
    }

    const newUser = new User(
      Date.now(),
      userData.username,
      userData.email,
      userData.password,
      new Date()
    );

    this.users.push(newUser);
    console.log('註冊成功，用戶列表:', this.users); // 調試用
    return newUser;
  }

  /**
   * 用戶登入
   */
  login(credentials) {
    const user = this.users.find(
      user => 
        (user.username === credentials.usernameOrEmail || user.email === credentials.usernameOrEmail) &&
        user.password === credentials.password
    );

    if (!user) {
      throw new Error('帳號或密碼錯誤');
    }

    return user;
  }

  /**
   * 獲取用戶統計
   */
  getUserStats() {
    const totalUsers = this.users.length;
    const registeredUsers = this.users.filter(user => user.id !== 1 && user.id !== 2).length;
    const systemUsers = 2;

    return {
      total: totalUsers,
      registered: registeredUsers,
      system: systemUsers
    };
  }

  /**
   * 刪除用戶
   */
  deleteUser(userId) {
    if (userId === 1 || userId === 2) {
      throw new Error('無法刪除系統預設帳號');
    }

    const userIndex = this.users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
      throw new Error('用戶不存在');
    }

    this.users.splice(userIndex, 1);
    return true;
  }
}

// 創建單例實例
const userController = new UserController();

export { UserController, userController };