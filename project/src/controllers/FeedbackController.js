/**
 * ============================================
 * 回饋控制器 - Feedback Controller
 * ============================================
 */

class Feedback {
  constructor(id, userId, username, email, subject, message, rating, status = 'pending', createdAt = new Date()) {
    this.id = id;
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.subject = subject;
    this.message = message;
    this.rating = rating; // 1-5 星評分
    this.status = status; // pending, reviewed, resolved
    this.createdAt = createdAt;
  }
}

// 單例模式的回饋控制器
class FeedbackController {
  constructor() {
    if (FeedbackController.instance) {
      return FeedbackController.instance;
    }
    
    // 初始化一些測試回饋
    this.feedbacks = [
      new Feedback(
        1, 
        2, 
        'user1', 
        'user1@example.com',
        '商品品質很好',
        '我購買的機械鍵盤品質非常好，按鍵手感很棒，非常滿意！',
        5,
        'reviewed',
        new Date('2025-01-15')
      ),
      new Feedback(
        2,
        2,
        'user1',
        'user1@example.com',
        '配送速度需要改善',
        '商品品質不錯，但配送時間有點久，希望能改善。',
        4,
        'pending',
        new Date('2025-01-18')
      )
    ];
    
    FeedbackController.instance = this;
  }

  /**
   * 提交新回饋
   */
  submitFeedback(feedbackData) {
    console.log('提交回饋:', feedbackData);
    
    const newFeedback = new Feedback(
      Date.now(),
      feedbackData.userId || null,
      feedbackData.username,
      feedbackData.email,
      feedbackData.subject,
      feedbackData.message,
      feedbackData.rating,
      'pending',
      new Date()
    );

    this.feedbacks.push(newFeedback);
    console.log('回饋提交成功:', newFeedback);
    return newFeedback;
  }

  /**
   * 獲取所有回饋 (管理員用)
   */
  getAllFeedbacks() {
    return this.feedbacks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  /**
   * 根據用戶ID獲取回饋
   */
  getFeedbacksByUser(userId) {
    return this.feedbacks.filter(feedback => feedback.userId === userId);
  }

  /**
   * 更新回饋狀態
   */
  updateFeedbackStatus(feedbackId, status) {
    const feedback = this.feedbacks.find(f => f.id === feedbackId);
    if (!feedback) {
      throw new Error('回饋不存在');
    }
    
    feedback.status = status;
    return feedback;
  }

  /**
   * 刪除回饋
   */
  deleteFeedback(feedbackId) {
    const feedbackIndex = this.feedbacks.findIndex(f => f.id === feedbackId);
    if (feedbackIndex === -1) {
      throw new Error('回饋不存在');
    }
    
    this.feedbacks.splice(feedbackIndex, 1);
    return true;
  }

  /**
   * 獲取回饋統計
   */
  getFeedbackStats() {
    const total = this.feedbacks.length;
    const pending = this.feedbacks.filter(f => f.status === 'pending').length;
    const reviewed = this.feedbacks.filter(f => f.status === 'reviewed').length;
    const resolved = this.feedbacks.filter(f => f.status === 'resolved').length;
    
    // 計算平均評分
    const avgRating = total > 0 
      ? (this.feedbacks.reduce((sum, f) => sum + f.rating, 0) / total).toFixed(1)
      : 0;

    return {
      total,
      pending,
      reviewed,
      resolved,
      avgRating
    };
  }
}

// 創建單例實例
const feedbackController = new FeedbackController();

export { FeedbackController, feedbackController };