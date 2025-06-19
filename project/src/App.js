/**
 * ============================================
 * 誠品電腦周邊 - 主應用程式
 * Eslite Computer Peripherals - Main Application
 * ============================================
 */

import React, { useState } from 'react';
import { Layout, Button, Typography, Space, Avatar, Dropdown, ConfigProvider, message } from 'antd';
import { 
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  LogoutOutlined,
  HeartOutlined,
  TeamOutlined,  // 添加用戶管理圖標
  MessageOutlined  // 添加回饋管理圖標
} from '@ant-design/icons';
import 'antd/dist/reset.css';
import './App.css';
import ProductCatalog from './views/ProductCatalog';
import ShoppingCart from './views/ShoppingCart';
import LoginRegister from './views/LoginRegister';
import UserManagement from './views/UserManagement';  // 添加用戶管理頁面
import CustomerFeedback from './views/CustomerFeedback';  // 添加客戶回饋頁面
import FeedbackManagement from './views/FeedbackManagement';  // 添加回饋管理頁面
import OrderManagement from './views/OrderManagement';
import { CartController } from './controllers/CartController';
import { colorTheme } from './theme/colors';

const { Header, Content, Footer } = Layout;
const { Title, Text } = Typography;

function App() {
  const [currentView, setCurrentView] = useState('catalog');
  const [cartController] = useState(new CartController());
  const [cartItems, setCartItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // 確保 handleAddToCart 函數正確傳遞商品資料
  const handleAddToCart = (product) => {
    console.log('添加到購物車的商品:', product); // 除錯用
    
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // 直接使用原始商品資料，只添加 quantity 屬性
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
    } else {
      const updatedCart = cartController.updateQuantity(productId, quantity);
      setCartItems([...updatedCart]);
    }
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = cartController.removeFromCart(productId);
    setCartItems([...updatedCart]);
  };

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    setCurrentView('catalog');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('catalog');
  };

  // 修正清空購物車函數
  const handleClearCart = () => {
    console.log('執行清空購物車');
    cartController.clearCart();
    setCartItems([]);
    message.success('購物車已清空');
  };

  // 確保 totalPrice 計算正確
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  console.log('目前總價:', totalPrice, '商品數量:', cartItems.length); // 除錯

  const userMenuItems = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '登出',
      onClick: handleLogout
    }
  ];

  // Ant Design 主題配置
  const antdTheme = {
    token: {
      colorPrimary: colorTheme.primary.minimumBlue,
      colorSuccess: colorTheme.functional.success,
      colorWarning: colorTheme.functional.warning,
      colorError: colorTheme.functional.error,
      colorInfo: colorTheme.functional.info,
      borderRadius: 8,
    },
  };

  // 添加登入導航函數
  const handleNavigateToLogin = () => {
    setCurrentView('login');
  };

  return (
    <ConfigProvider theme={antdTheme}>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{
          background: colorTheme.gradients.primary,
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 12px rgba(4, 42, 43, 0.2)',
          borderBottom: `3px solid ${colorTheme.primary.mandarin}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <ShopOutlined style={{ 
              fontSize: '28px', 
              color: colorTheme.primary.lightCyan, 
              marginRight: '16px'
            }} />
            <Title level={3} style={{ 
              color: colorTheme.primary.lightCyan, 
              margin: 0,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
              誠品電腦周邊
            </Title>
          </div>

          <Space size="large">
            <Button
              type={currentView === 'catalog' ? 'primary' : 'ghost'}
              icon={<ShopOutlined />}
              onClick={() => setCurrentView('catalog')}
              style={{ 
                color: currentView === 'catalog' ? colorTheme.primary.richBlack : colorTheme.primary.lightCyan,
                borderColor: colorTheme.primary.lightCyan,
                backgroundColor: currentView === 'catalog' ? colorTheme.primary.lightCyan : 'transparent',
                fontWeight: '500'
              }}
            >
              產品目錄
            </Button>

            <Button
              type={currentView === 'cart' ? 'primary' : 'ghost'}
              icon={<ShoppingCartOutlined />}
              onClick={() => setCurrentView('cart')}
              style={{ 
                color: currentView === 'cart' ? colorTheme.primary.richBlack : colorTheme.primary.lightCyan,
                borderColor: colorTheme.primary.lightCyan,
                backgroundColor: currentView === 'cart' ? colorTheme.primary.lightCyan : 'transparent',
                fontWeight: '500'
              }}
            >
              購物車 ({cartItems.length})
            </Button>

            {currentUser ? (
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
                <Space style={{ 
                  color: colorTheme.primary.lightCyan, 
                  cursor: 'pointer',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  background: 'rgba(205, 237, 246, 0.2)'
                }}>
                  <Avatar 
                    icon={<UserOutlined />} 
                    style={{ 
                      backgroundColor: colorTheme.primary.mandarin,
                      color: 'white'
                    }}
                  />
                  <Text style={{ color: colorTheme.primary.lightCyan, fontWeight: '500' }}>
                    歡迎，{currentUser.username}
                  </Text>
                </Space>
              </Dropdown>
            ) : (
              <Button
                type={currentView === 'login' ? 'primary' : 'ghost'}
                icon={<UserOutlined />}
                onClick={() => setCurrentView('login')}
                style={{ 
                  color: currentView === 'login' ? colorTheme.primary.richBlack : colorTheme.primary.lightCyan,
                  borderColor: colorTheme.primary.lightCyan,
                  backgroundColor: currentView === 'login' ? colorTheme.primary.lightCyan : 'transparent',
                  fontWeight: '500'
                }}
              >
                登入/註冊
              </Button>
            )}

            <Button
              type={currentView === 'support' ? 'primary' : 'ghost'}
              icon={<HeartOutlined />}
              onClick={() => setCurrentView('support')}
              style={{ 
                color: currentView === 'support' ? colorTheme.primary.richBlack : colorTheme.primary.lightCyan,
                borderColor: colorTheme.primary.lightCyan,
                backgroundColor: currentView === 'support' ? colorTheme.primary.lightCyan : 'transparent',
                fontWeight: '500'
              }}
            >
              客戶回饋
            </Button>
          </Space>
        </Header>

        <Content style={{ background: colorTheme.background.primary }}>
          {currentView === 'catalog' && (
            <ProductCatalog onAddToCart={handleAddToCart} />
          )}
          {currentView === 'cart' && (
            <ShoppingCart 
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearCart={handleClearCart}  // 確保這裡正確傳遞
              totalPrice={totalPrice}
              currentUser={currentUser}
              onNavigateToLogin={handleNavigateToLogin}
            />
          )}
          {currentView === 'login' && (
            <LoginRegister onLoginSuccess={handleLoginSuccess} />
          )}
          {currentView === 'users' && (
            <UserManagement />
          )}
          {currentView === 'support' && (
            <CustomerFeedback currentUser={currentUser} />
          )}
          {currentView === 'feedback-management' && (
            <FeedbackManagement />
          )}
          {currentView === 'order-management' && (
            <OrderManagement />
          )}
        </Content>

        <Footer style={{
          background: colorTheme.primary.richBlack,
          color: colorTheme.primary.lightCyan,
          textAlign: 'center',
          padding: '32px 50px',
          borderTop: `4px solid ${colorTheme.primary.mandarin}`
        }}>
          <div>
            <Text style={{ 
              color: colorTheme.primary.lightCyan, 
              fontSize: '16px',
              fontWeight: '500'
            }}>
              © 2025 誠品電腦周邊 版權所有 | All Rights Reserved
            </Text>
            <br />
            <Text style={{ 
              color: colorTheme.primary.minimumBlue,
              fontSize: '14px'
            }}>
              Powered by React.js & Ant Design | 採用 MVC 架構開發
            </Text>
            <div style={{ 
              marginTop: '12px',
              padding: '8px',
              background: colorTheme.gradients.secondary,
              borderRadius: '20px',
              display: 'inline-block',
              cursor: 'pointer'
            }}>
              {/* 隱藏的用戶管理按鈕 - 只有管理員可以看到 */}
              {currentUser && currentUser.username === 'admin' ? (
                <Space>
                  <Button
                    type="text"
                    size="small"
                    icon={<TeamOutlined />}
                    onClick={() => setCurrentView('users')}
                    style={{ 
                      color: 'white',
                      border: 'none',
                      fontSize: '12px',
                      height: 'auto',
                      padding: '0 8px',
                      fontWeight: '500'
                    }}
                  >
                    👥 用戶管理
                  </Button>
                  <Button
                    type="text"
                    size="small"
                    icon={<MessageOutlined />}
                    onClick={() => setCurrentView('feedback-management')}
                    style={{ 
                      color: 'white',
                      border: 'none',
                      fontSize: '12px',
                      height: 'auto',
                      padding: '0 8px',
                      fontWeight: '500'
                    }}
                  >
                    💬 回饋管理
                  </Button>
                  <Button
                    type="text"
                    size="small"
                    icon={<ShopOutlined />}
                    onClick={() => setCurrentView('order-management')}
                    style={{ 
                      color: 'white',
                      border: 'none',
                      fontSize: '12px',
                      height: 'auto',
                      padding: '0 8px',
                      fontWeight: '500'
                    }}
                  >
                    📦 訂單管理
                  </Button>
                </Space>
              ) : null}
            </div>
          </div>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
}

export default App;

/* 
 * ============================================
 * 版權聲明 | Copyright Notice
 * ============================================
 * 
 * 誠品電腦周邊 © 2025 版權所有
 * Eslite Computer Peripherals © 2025 All Rights Reserved
 * 
 * 本系統為電腦周邊產品銷售平台
 * This system is a computer peripherals sales platform
 * 
 * 技術架構：React.js + MVC Pattern
 * Technical Architecture: React.js + MVC Pattern
 * 
 * 開發團隊：GitHub Copilot & Development Team
 * Development Team: GitHub Copilot & Development Team
 * 
 * ============================================
 */