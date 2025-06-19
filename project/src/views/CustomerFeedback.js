/**
 * ============================================
 * 客戶回饋頁面 - Customer Feedback Page
 * ============================================
 */

import React, { useState } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Rate, 
  message, 
  Typography,
  Divider,
  Space,
  Alert
} from 'antd';
import { 
  MessageOutlined,
  StarOutlined,
  SendOutlined,
  UserOutlined,
  MailOutlined
} from '@ant-design/icons';
import { colorTheme } from '../theme/colors';
import { feedbackController } from '../controllers/FeedbackController';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const CustomerFeedback = ({ currentUser }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const feedbackData = {
        userId: currentUser?.id || null,
        username: currentUser?.username || values.name,
        email: currentUser?.email || values.email,
        subject: values.subject,
        message: values.message,
        rating: values.rating
      };

      feedbackController.submitFeedback(feedbackData);
      
      message.success('感謝您的回饋！我們會認真處理您的意見。');
      form.resetFields();
      setSubmitted(true);
      
      // 3秒後重置提交狀態
      setTimeout(() => setSubmitted(false), 3000);
      
    } catch (error) {
      message.error('提交失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  const ratingLabels = {
    1: '很不滿意',
    2: '不滿意', 
    3: '一般',
    4: '滿意',
    5: '非常滿意'
  };

  return (
    <div style={{ 
      padding: '24px',
      background: colorTheme.background.primary,
      minHeight: '80vh'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto'
      }}>
        <Card
          style={{
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(4, 42, 43, 0.12)',
            border: `2px solid ${colorTheme.primary.minimumBlue}`
          }}
          bodyStyle={{ padding: '40px' }}
        >
          {/* 標題區域 */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <MessageOutlined style={{ 
              fontSize: '48px', 
              color: colorTheme.primary.minimumBlue,
              marginBottom: '16px'
            }} />
            <Title level={2} style={{ 
              color: colorTheme.primary.richBlack,
              marginBottom: '8px'
            }}>
              💬 客戶回饋
            </Title>
            <Paragraph style={{ 
              fontSize: '16px',
              color: colorTheme.primary.minimumBlue,
              margin: 0
            }}>
              您的意見對我們非常重要，請分享您的使用體驗
            </Paragraph>
          </div>

          {submitted && (
            <Alert
              message="回饋提交成功！"
              description="感謝您的寶貴意見，我們將認真處理並持續改善服務品質。"
              type="success"
              showIcon
              style={{ 
                marginBottom: '32px',
                borderRadius: '8px',
                border: `1px solid ${colorTheme.functional.success}`
              }}
            />
          )}

          {/* 回饋表單 */}
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            size="large"
            initialValues={{
              name: currentUser?.username || '',
              email: currentUser?.email || ''
            }}
          >
            {/* 如果用戶未登入，需要填寫姓名和郵件 */}
            {!currentUser && (
              <>
                <Form.Item
                  name="name"
                  label="姓名"
                  rules={[{ required: true, message: '請輸入您的姓名' }]}
                >
                  <Input
                    prefix={<UserOutlined style={{ color: colorTheme.primary.minimumBlue }} />}
                    placeholder="請輸入您的姓名"
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>

                <Form.Item
                  name="email"
                  label="電子郵件"
                  rules={[
                    { required: true, message: '請輸入電子郵件' },
                    { type: 'email', message: '請輸入有效的電子郵件格式' }
                  ]}
                >
                  <Input
                    prefix={<MailOutlined style={{ color: colorTheme.primary.minimumBlue }} />}
                    placeholder="請輸入您的電子郵件"
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>
              </>
            )}

            {/* 回饋主題 */}
            <Form.Item
              name="subject"
              label="回饋主題"
              rules={[{ required: true, message: '請輸入回饋主題' }]}
            >
              <Input
                placeholder="簡述您的回饋主題"
                style={{ borderRadius: '8px' }}
              />
            </Form.Item>

            {/* 滿意度評分 */}
            <Form.Item
              name="rating"
              label="整體滿意度"
              rules={[{ required: true, message: '請為我們的服務評分' }]}
            >
              <div>
                <Rate 
                  style={{ fontSize: '32px', color: colorTheme.primary.mandarin }}
                  character={<StarOutlined />}
                />
                <div style={{ marginTop: '8px' }}>
                  <Text type="secondary">
                    點擊星星為我們的服務評分
                  </Text>
                </div>
              </div>
            </Form.Item>

            {/* 詳細回饋 */}
            <Form.Item
              name="message"
              label="詳細回饋"
              rules={[
                { required: true, message: '請輸入您的詳細回饋' },
                { min: 10, message: '回饋內容至少需要10個字元' }
              ]}
            >
              <TextArea
                rows={6}
                placeholder="請詳細描述您的意見、建議或問題..."
                style={{ borderRadius: '8px' }}
                showCount
                maxLength={500}
              />
            </Form.Item>

            <Divider />

            {/* 提交按鈕 */}
            <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                size="large"
                icon={<SendOutlined />}
                style={{ 
                  borderRadius: '8px',
                  background: colorTheme.gradients.secondary,
                  border: 'none',
                  height: '48px',
                  paddingLeft: '32px',
                  paddingRight: '32px',
                  fontSize: '16px',
                  fontWeight: '500',
                  boxShadow: `0 4px 12px rgba(239, 123, 69, 0.3)`
                }}
              >
                {loading ? '提交中...' : '提交回饋'}
              </Button>
            </Form.Item>
          </Form>

          {/* 底部提示 */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: '32px',
            padding: '20px',
            background: colorTheme.background.secondary,
            borderRadius: '12px',
            border: `1px solid ${colorTheme.primary.lightCyan}`
          }}>
            <Space direction="vertical" size="small">
              <Text strong style={{ color: colorTheme.primary.richBlack }}>
                📞 其他聯繫方式
              </Text>
              <Text type="secondary">
                客服電話：(02) 1234-5678 | 客服郵件：support@eslite-computer.com
              </Text>
              <Text type="secondary">
                服務時間：週一至週五 09:00-18:00
              </Text>
            </Space>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CustomerFeedback;