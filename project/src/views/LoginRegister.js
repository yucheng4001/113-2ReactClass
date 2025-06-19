/**
 * ============================================
 * 誠品電腦周邊 - 登入註冊系統
 * Eslite Computer Peripherals - Login Registration System
 * ============================================
 */

import React, { useState } from 'react';
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Tabs, 
  message, 
  Typography, 
  Alert
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  MailOutlined,
  LoginOutlined,
  UserAddOutlined
} from '@ant-design/icons';
import { colorTheme } from '../theme/colors';
import { userController } from '../controllers/UserController'; // 使用單例控制器

const { Title, Text } = Typography;

const LoginRegister = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loading, setLoading] = useState(false);
  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const user = userController.login({
        usernameOrEmail: values.usernameOrEmail,
        password: values.password
      });
      
      message.success(`歡迎回來，${user.username}！`);
      onLoginSuccess(user);
      loginForm.resetFields();
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      console.log('開始註冊流程，輸入值:', values); // 調試用
      
      const newUser = userController.register({
        username: values.username,
        email: values.email,
        password: values.password
      });
      
      console.log('註冊成功，新用戶:', newUser); // 調試用
      
      message.success(`註冊成功！歡迎，${newUser.username}！`);
      registerForm.resetFields();
      
      // 註冊成功後自動切換到登入頁面
      setTimeout(() => {
        setActiveTab('login');
        message.info('請使用新帳號登入');
      }, 1500);
      
    } catch (error) {
      console.error('註冊失敗:', error); // 調試用
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '70vh',
      background: colorTheme.gradients.light,
      padding: '20px'
    }}>
      <Card 
        style={{ 
          width: '100%', 
          maxWidth: 450,
          boxShadow: `0 12px 40px rgba(4, 42, 43, 0.15)`,
          borderRadius: '16px',
          overflow: 'hidden',
          border: `2px solid ${colorTheme.primary.minimumBlue}`
        }}
        bodyStyle={{ 
          padding: '40px 32px',
          background: colorTheme.background.card
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={2} style={{ 
            color: colorTheme.primary.richBlack, 
            marginBottom: '8px',
            fontWeight: '600'
          }}>
            誠品電腦周邊
          </Title>
          <Text type="secondary" style={{ 
            fontSize: '16px',
            color: colorTheme.primary.minimumBlue
          }}>
            歡迎使用我們的服務
          </Text>
        </div>

        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          centered
          size="large"
          style={{ marginBottom: '24px' }}
          items={[
            {
              key: 'login',
              label: (
                <span>
                  <LoginOutlined />
                  登入
                </span>
              ),
              children: (
                <Form
                  form={loginForm}
                  name="login"
                  onFinish={handleLogin}
                  layout="vertical"
                  size="large"
                >
                  <Form.Item
                    name="usernameOrEmail"
                    rules={[{ required: true, message: '請輸入用戶名或電子郵件' }]}
                  >
                    <Input
                      prefix={<UserOutlined style={{ color: colorTheme.primary.minimumBlue }} />}
                      placeholder="用戶名或電子郵件"
                      style={{ 
                        borderRadius: '8px',
                        borderColor: colorTheme.primary.minimumBlue
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: '請輸入密碼' },
                      { min: 6, message: '密碼至少需要6個字元' }
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined style={{ color: colorTheme.primary.minimumBlue }} />}
                      placeholder="密碼"
                      style={{ 
                        borderRadius: '8px',
                        borderColor: colorTheme.primary.minimumBlue
                      }}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      block
                      size="large"
                      style={{ 
                        borderRadius: '8px',
                        background: colorTheme.gradients.primary,
                        border: 'none',
                        height: '48px',
                        fontSize: '16px',
                        fontWeight: '500',
                        boxShadow: `0 4px 12px rgba(94, 177, 191, 0.3)`
                      }}
                    >
                      {loading ? '登入中...' : '登入'}
                    </Button>
                  </Form.Item>
                </Form>
              )
            },
            {
              key: 'register',
              label: (
                <span>
                  <UserAddOutlined />
                  註冊
                </span>
              ),
              children: (
                <Form
                  form={registerForm}
                  name="register"
                  onFinish={handleRegister}
                  layout="vertical"
                  size="large"
                >
                  <Form.Item
                    name="username"
                    rules={[
                      { required: true, message: '請輸入用戶名' },
                      { min: 3, message: '用戶名至少需要3個字元' },
                      { max: 20, message: '用戶名不能超過20個字元' }
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined style={{ color: colorTheme.primary.minimumBlue }} />}
                      placeholder="用戶名"
                      style={{ 
                        borderRadius: '8px',
                        borderColor: colorTheme.primary.minimumBlue
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: '請輸入電子郵件' },
                      { type: 'email', message: '請輸入有效的電子郵件地址' }
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined style={{ color: colorTheme.primary.minimumBlue }} />}
                      placeholder="電子郵件"
                      style={{ 
                        borderRadius: '8px',
                        borderColor: colorTheme.primary.minimumBlue
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      { required: true, message: '請輸入密碼' },
                      { min: 6, message: '密碼至少需要6個字元' }
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      prefix={<LockOutlined style={{ color: colorTheme.primary.minimumBlue }} />}
                      placeholder="密碼"
                      style={{ 
                        borderRadius: '8px',
                        borderColor: colorTheme.primary.minimumBlue
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    name="confirmPassword"
                    dependencies={['password']}
                    rules={[
                      { required: true, message: '請確認密碼' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('密碼確認不相符'));
                        },
                      }),
                    ]}
                    hasFeedback
                  >
                    <Input.Password
                      prefix={<LockOutlined style={{ color: colorTheme.primary.minimumBlue }} />}
                      placeholder="確認密碼"
                      style={{ 
                        borderRadius: '8px',
                        borderColor: colorTheme.primary.minimumBlue
                      }}
                    />
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loading}
                      block
                      size="large"
                      style={{ 
                        borderRadius: '8px',
                        background: colorTheme.gradients.secondary,
                        border: 'none',
                        height: '48px',
                        fontSize: '16px',
                        fontWeight: '500',
                        boxShadow: `0 4px 12px rgba(239, 123, 69, 0.3)`
                      }}
                    >
                      {loading ? '註冊中...' : '註冊'}
                    </Button>
                  </Form.Item>
                </Form>
              )
            }
          ]}
        />

        <Alert
          message="Demo 帳號資訊"
          description={
            <div>
              <p><strong>管理員：</strong>admin / admin123</p>
              <p><strong>測試用戶：</strong>user1 / password123</p>
              <p><strong>提示：</strong>註冊新帳號後可以在用戶管理中查看</p>
            </div>
          }
          type="info"
          showIcon
          style={{ 
            borderRadius: '8px',
            background: colorTheme.background.secondary,
            border: `1px solid ${colorTheme.primary.minimumBlue}`,
            color: colorTheme.primary.richBlack
          }}
        />
      </Card>
    </div>
  );
};

export default LoginRegister;

/* 
 * ============================================
 * 版權聲明 | Copyright Notice
 * ============================================
 * 
 * 誠品電腦周邊 © 2025 版權所有
 * Eslite Computer Peripherals © 2025 All Rights Reserved
 * 
 * 用戶認證系統 | User Authentication System
 * Enhanced with Ant Design UI Framework
 * 
 * ============================================
 */