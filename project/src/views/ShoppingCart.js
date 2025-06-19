/**
 * ============================================
 * 購物車頁面 - Shopping Cart Page (更新版)
 * ============================================
 */

import React, { useState } from 'react';
import { 
  Card, 
  Table, 
  Button, 
  Typography, 
  Space, 
  InputNumber, 
  Image,
  Empty,
  Divider,
  Modal,
  Form,
  Input,
  Select,
  Radio,
  message,
  Steps
} from 'antd';
import { 
  ShoppingCartOutlined,
  DeleteOutlined,
  ClearOutlined,
  ShoppingOutlined,
  UserOutlined,
  HomeOutlined,
  CreditCardOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { colorTheme } from '../theme/colors';
import { orderController } from '../controllers/OrderController';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;
const { Step } = Steps;

const ShoppingCart = ({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart,  // 添加清空購物車的 prop
  totalPrice,
  currentUser,
  onNavigateToLogin 
}) => {
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(0);
  const [checkoutForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);
  const [loginModalVisible, setLoginModalVisible] = useState(false);

  console.log('ShoppingCart props:', { 
    cartItems: cartItems?.length, 
    onClearCart: typeof onClearCart,
    onRemoveItem: typeof onRemoveItem});

  // 在 ShoppingCart.js 中添加更多除錯
  console.log('ShoppingCart 重新渲染, 商品數量:', cartItems.length); // 除錯

  // 處理結帳按鈕點擊
  const handleCheckoutClick = () => {
    if (!currentUser) {
      setLoginModalVisible(true);
      return;
    }
    if (cartItems.length === 0) {
      message.warning('購物車是空的，無法結帳');
      return;
    }
    setCheckoutModalVisible(true);
    setCheckoutStep(0);
    setOrderComplete(false);
    checkoutForm.setFieldsValue({
      email: currentUser.email,
      paymentMethod: 'credit_card'
    });
  };

  // 處理結帳表單提交
  const handleCheckoutSubmit = async (values) => {
    console.log('結帳表單 values:', values);
console.log('shippingAddress:', {
  name: values.name,
  phone: values.phone,
  address: values.address,
  city: values.city,
  postalCode: values.postalCode
});
    setLoading(true);
    try {
      const orderData = {
        userId: currentUser.id,
        username: currentUser.username,
        email: currentUser.email,
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity
        })),
        totalAmount: totalPrice,
        shippingAddress: {
          name: values.name,
          phone: values.phone,
          address: values.address,
          city: values.city,
          postalCode: values.postalCode
        },
        paymentMethod: values.paymentMethod
      };

      console.log('創建訂單數據:', orderData);

      // 使用 orderController 創建訂單
      const newOrder = orderController.createOrder(orderData);

      setCompletedOrder(newOrder);
      setOrderComplete(true);
      setCheckoutStep(2);

      message.success('🎉 訂單建立成功！');

      // 延遲 1.5 秒後再清空購物車
      setTimeout(() => {
        if (onClearCart) {
          onClearCart();
        } else {
          cartItems.forEach(item => onRemoveItem(item.id));
        }
      }, 15000); // 1.5 秒延遲

    } catch (error) {
      console.error('訂單創建失敗:', error);
      message.error('訂單建立失敗，請稍後再試');
    } finally {
      setLoading(false);
    }
  };

  // 下一步
  const handleNext = () => {
    if (checkoutStep === 0) {
      checkoutForm.validateFields(['name', 'phone', 'address', 'city', 'postalCode'])
        .then(() => {
          setCheckoutStep(1);
        })
        .catch(() => {
          message.error('請完整填寫配送信息');
        });
    } else if (checkoutStep === 1) {
      checkoutForm.validateFields(['paymentMethod'])
        .then(() => {
          checkoutForm.submit();
        })
        .catch(() => {
          message.error('請選擇付款方式');
        });
    }
  };

  // 上一步
  const handlePrev = () => {
    setCheckoutStep(checkoutStep - 1);
  };

  // 安全的圖片回退函數
  const getSafeImageFallback = (product) => {
    const safeName = product?.name || '商品';
    const firstChar = safeName.charAt(0) || '商';
    return `https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=${encodeURIComponent(firstChar)}`;
  };

  // 處理圖片載入錯誤
  const handleImageError = (e, product) => {
    e.target.src = getSafeImageFallback(product);
  };

  // 修正購物車商品列表的列定義
  const columns = [
    {
      title: '商品',
      dataIndex: 'image',
      key: 'product',
      render: (image, record) => (
        <Space>
          <Image
            src={record.image || ''}
            alt={record.name || '商品'}
            width={60}
            height={60}
            style={{ 
              borderRadius: '6px',
              objectFit: 'cover'
            }}
            fallback={`https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=${encodeURIComponent((record.name || '商品').charAt(0))}`}
            onError={(e) => {
              e.target.src = `https://via.placeholder.com/60x60/4A90E2/FFFFFF?text=${encodeURIComponent((record.name || '商品').charAt(0))}`;
            }}
          />
          <div>
            <Text strong>{record.name}</Text>
            <br />
            <Text type="secondary">{record.category}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: '單價',
      dataIndex: 'price',
      key: 'price',
      render: (price) => (
        <Text strong style={{ color: colorTheme.primary.mandarin }}>
          NT$ {(price || 0).toLocaleString()}
        </Text>
      ),
    },
    {
      title: '數量',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <InputNumber
          min={1}
          max={99}
          value={quantity || 1}
          onChange={(value) => onUpdateQuantity(record.id, value)}
          style={{ width: '80px' }}
        />
      ),
    },
    {
      title: '小計',
      key: 'subtotal',
      render: (_, record) => {
        const subtotal = (record.price || 0) * (record.quantity || 1);
        return (
          <Text strong style={{ color: colorTheme.primary.richBlack }}>
            NT$ {subtotal.toLocaleString()}
          </Text>
        );
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => onRemoveItem(record.id)}
        >
          移除
        </Button>
      ),
    },
  ];

  // 如果購物車是空的
  if (cartItems.length === 0) {
    return (
      <div style={{ 
        padding: '48px',
        background: colorTheme.background.primary,
        minHeight: '60vh'
      }}>
        <Card 
          style={{ 
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(4, 42, 43, 0.12)'
          }}
          bodyStyle={{ padding: '60px 40px' }}
        >
          <Empty
            image={<ShoppingCartOutlined style={{ fontSize: '72px', color: colorTheme.primary.minimumBlue }} />}
            imageStyle={{ marginBottom: '24px' }}
            description={
              <div>
                <Title level={3} style={{ color: colorTheme.primary.richBlack }}>
                  購物車是空的
                </Title>
                <Paragraph style={{ color: colorTheme.primary.minimumBlue, fontSize: '16px' }}>
                  還沒有添加任何商品，快去挑選喜歡的商品吧！
                </Paragraph>
              </div>
            }
          >
            <Button 
              type="primary" 
              size="large"
              icon={<ShoppingOutlined />}
              style={{
                background: colorTheme.gradients.primary,
                borderColor: 'transparent',
                height: '48px',
                paddingLeft: '32px',
                paddingRight: '32px',
                fontSize: '16px'
              }}
            >
              去購物
            </Button>
          </Empty>
        </Card>
      </div>
    );
  }

  // 主要的購物車界面
  return (
    <div style={{ 
      padding: '24px',
      background: colorTheme.background.primary,
      minHeight: '80vh'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <Card
          style={{
            borderRadius: '16px',
            boxShadow: '0 8px 24px rgba(4, 42, 43, 0.12)',
            marginBottom: '24px'
          }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '24px' 
          }}>
            <Title level={2} style={{ margin: 0, color: colorTheme.primary.richBlack }}>
              🛒 購物車
            </Title>
            <Text style={{ fontSize: '16px', color: colorTheme.primary.minimumBlue }}>
              共 {cartItems.length} 件商品
            </Text>
          </div>

          <Table
            columns={columns}
            dataSource={cartItems}
            rowKey="id"
            pagination={false}
            style={{ marginBottom: '24px' }}
          />

          <Divider />

          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: '24px'
          }}>
            <Space>
              <Button
                icon={<ClearOutlined />}
                onClick={onClearCart}  
                disabled={cartItems.length === 0}
                style={{
                  opacity: cartItems.length === 0 ? 0.5 : 1
                }}
              >
                清空購物車 ({cartItems.length})
              </Button>
            </Space>

            <div style={{ textAlign: 'right' }}>
              <div style={{ marginBottom: '16px' }}>
                <Text style={{ fontSize: '18px', marginRight: '16px' }}>
                  總計：
                </Text>
                <Text 
                  strong 
                  style={{ 
                    fontSize: '24px', 
                    color: colorTheme.primary.mandarin 
                  }}
                >
                  NT$ {totalPrice.toLocaleString()}
                </Text>
              </div>
              
              <Button
                type="primary"
                size="large"
                icon={<CreditCardOutlined />}
                onClick={handleCheckoutClick}
                disabled={cartItems.length === 0}
                style={{
                  background: cartItems.length === 0 
                    ? '#d9d9d9' 
                    : colorTheme.gradients.secondary,
                  borderColor: 'transparent',
                  height: '48px',
                  paddingLeft: '32px',
                  paddingRight: '32px',
                  fontSize: '16px',
                  fontWeight: '500',
                  opacity: cartItems.length === 0 ? 0.6 : 1
                }}
              >
                立即結帳 ({cartItems.length} 件)
              </Button>
            </div>
          </div>
        </Card>

        {/* 結帳彈窗 */}
        <Modal
          title={
            <div style={{ textAlign: 'center' }}>
              <Title level={3} style={{ margin: 0, color: colorTheme.primary.richBlack }}>
                💳 結帳流程
              </Title>
            </div>
          }
          open={checkoutModalVisible}
          onCancel={() => {
            setCheckoutModalVisible(false);
            setCheckoutStep(0);
            setOrderComplete(false);
            checkoutForm.resetFields();
          }}
          footer={null}
          width={600}
          destroyOnClose
        >
          <Steps current={checkoutStep} style={{ marginBottom: '32px' }}>
            <Step title="配送信息" icon={<HomeOutlined />} />
            <Step title="付款方式" icon={<CreditCardOutlined />} />
            <Step title="完成訂單" icon={<CheckCircleOutlined />} />
          </Steps>

          {!orderComplete ? (
            <Form
              form={checkoutForm}
              layout="vertical"
              onFinish={handleCheckoutSubmit}
              size="large"
            >
              {/* 步驟 1: 配送信息 */}
              <div style={{ display: checkoutStep === 0 ? 'block' : 'none' }}>
                <Title level={4} style={{ color: colorTheme.primary.richBlack }}>
                  📦 配送信息
                </Title>
                
                <Form.Item
                  name="name"
                  label="收件人姓名"
                  rules={[{ required: true, message: '請輸入收件人姓名' }]}
                >
                  <Input placeholder="請輸入收件人姓名" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="聯絡電話"
                  rules={[
                    { required: true, message: '請輸入聯絡電話' },
                    { pattern: /^09\d{8}$/, message: '請輸入有效的手機號碼' }
                  ]}
                >
                  <Input placeholder="請輸入聯絡電話" />
                </Form.Item>

                <Form.Item
                  name="address"
                  label="詳細地址"
                  rules={[{ required: true, message: '請輸入詳細地址' }]}
                >
                  <Input.TextArea 
                    rows={3} 
                    placeholder="請輸入詳細地址"
                  />
                </Form.Item>

                <Space.Compact style={{ width: '100%' }}>
                  <Form.Item
                    name="city"
                    label="城市"
                    rules={[{ required: true, message: '請選擇城市' }]}
                    style={{ width: '50%', marginRight: '8px' }}
                  >
                    <Select placeholder="選擇城市">
                      <Option value="台北市">台北市</Option>
                      <Option value="新北市">新北市</Option>
                      <Option value="桃園市">桃園市</Option>
                      <Option value="台中市">台中市</Option>
                      <Option value="台南市">台南市</Option>
                      <Option value="高雄市">高雄市</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name="postalCode"
                    label="郵遞區號"
                    rules={[{ required: true, message: '請輸入郵遞區號' }]}
                    style={{ width: '50%' }}
                  >
                    <Input placeholder="郵遞區號" />
                  </Form.Item>
                </Space.Compact>
              </div>

              {/* 步驟 2: 付款方式 */}
              <div style={{ display: checkoutStep === 1 ? 'block' : 'none' }}>
                <Title level={4} style={{ color: colorTheme.primary.richBlack }}>
                  💳 付款方式
                </Title>
                
                <Form.Item
                  name="paymentMethod"
                  rules={[{ required: true, message: '請選擇付款方式' }]}
                >
                  <Radio.Group style={{ width: '100%' }}>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      <Radio value="credit_card" style={{ padding: '12px', border: '1px solid #d9d9d9', borderRadius: '6px', width: '100%' }}>
                        <Space>
                          <CreditCardOutlined style={{ color: colorTheme.primary.minimumBlue }} />
                          <div>
                            <Text strong>信用卡付款</Text>
                            <br />
                            <Text type="secondary">支援 Visa、MasterCard、JCB</Text>
                          </div>
                        </Space>
                      </Radio>
                      <Radio value="bank_transfer" style={{ padding: '12px', border: '1px solid #d9d9d9', borderRadius: '6px', width: '100%' }}>
                        <Space>
                          <span style={{ color: colorTheme.primary.minimumBlue }}>🏦</span>
                          <div>
                            <Text strong>銀行轉帳</Text>
                            <br />
                            <Text type="secondary">轉帳後請保留收據</Text>
                          </div>
                        </Space>
                      </Radio>
                      <Radio value="cash_on_delivery" style={{ padding: '12px', border: '1px solid #d9d9d9', borderRadius: '6px', width: '100%' }}>
                        <Space>
                          <span style={{ color: colorTheme.primary.minimumBlue }}>💰</span>
                          <div>
                            <Text strong>貨到付款</Text>
                            <br />
                            <Text type="secondary">商品送達時現金付款</Text>
                          </div>
                        </Space>
                      </Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>

                {/* 訂單摘要 */}
                <div style={{ 
                  background: colorTheme.background.secondary,
                  padding: '16px',
                  borderRadius: '8px',
                  marginTop: '24px'
                }}>
                  <Title level={5} style={{ color: colorTheme.primary.richBlack }}>
                    📋 訂單摘要
                  </Title>
                  <div style={{ marginBottom: '8px' }}>
                    <Text>商品數量：{cartItems.length} 件</Text>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <Text>商品金額：NT$ {totalPrice.toLocaleString()}</Text>
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    <Text>運費：NT$ 0</Text>
                  </div>
                  <Divider style={{ margin: '12px 0' }} />
                  <div>
                    <Text strong style={{ fontSize: '16px', color: colorTheme.primary.mandarin }}>
                      總金額：NT$ {totalPrice.toLocaleString()}
                    </Text>
                  </div>
                </div>
              </div>
            </Form>
          ) : (
            /* 步驟 3: 訂單完成 */
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <CheckCircleOutlined 
                style={{ 
                  fontSize: '72px', 
                  color: colorTheme.functional.success,
                  marginBottom: '24px'
                }} 
              />
              <Title level={3} style={{ color: colorTheme.primary.richBlack }}>
                🎉 訂單建立成功！
              </Title>
              <Paragraph style={{ fontSize: '16px', color: colorTheme.primary.minimumBlue }}>
                訂單編號：#{completedOrder?.id}
              </Paragraph>
              <Paragraph style={{ color: colorTheme.primary.minimumBlue }}>
                我們將盡快為您處理訂單，感謝您的購買！
              </Paragraph>
              <Paragraph style={{ color: colorTheme.primary.minimumBlue, fontSize: '14px' }}>
                購物車已自動清空，您可以繼續選購其他商品
              </Paragraph>
              
              <Space style={{ marginTop: '24px' }}>
                <Button 
                  type="primary"
                  onClick={() => {
                    setCheckoutModalVisible(false);
                    setCheckoutStep(0);
                    setOrderComplete(false);
                    checkoutForm.resetFields();
                  }}
                  style={{
                    background: colorTheme.gradients.primary,
                    borderColor: 'transparent'
                  }}
                >
                  繼續購物
                </Button>
                <Button 
                  onClick={() => {
                    setCheckoutModalVisible(false);
                    // 可以導航到訂單頁面查看訂單詳情
                    message.info('訂單詳情功能開發中...');
                  }}
                >
                  查看訂單
                </Button>
              </Space>
            </div>
          )}

          {/* 步驟導航按鈕 */}
          {!orderComplete && (
            <div style={{ 
              marginTop: '32px', 
              display: 'flex', 
              justifyContent: 'space-between' 
            }}>
              {checkoutStep > 0 ? (
                <Button onClick={handlePrev}>
                  上一步
                </Button>
              ) : <div />}
              
              <Button 
                type="primary" 
                onClick={handleNext}
                loading={loading}
                style={{
                  background: colorTheme.gradients.secondary,
                  borderColor: 'transparent'
                }}
              >
                {checkoutStep === 1 ? '確認訂單' : '下一步'}
              </Button>
            </div>
          )}
        </Modal>

        {/* 登入提示彈窗 */}
        <Modal
          open={loginModalVisible}
          title="請先登入"
          onCancel={() => setLoginModalVisible(false)}
          footer={[
            <Button key="login" type="primary" onClick={() => {
              setLoginModalVisible(false);
              onNavigateToLogin();
            }}>
              前往登入
            </Button>,
            <Button key="cancel" onClick={() => setLoginModalVisible(false)}>
              取消
            </Button>
          ]}
          centered
        >
          <Text>您尚未登入，請先登入才能結帳。</Text>
        </Modal>
      </div>
    </div>
  );
};

export default ShoppingCart;

/* 
 * ============================================
 * 版權聲明 | Copyright Notice
 * ============================================
 * 
 * © 2025 誠品電腦周邊 版權所有
 * © 2025 Eslite Computer Peripherals. All rights reserved.
 * 
 * 購物車系統 - Enhanced with Ant Design
 * Shopping cart system - Enhanced with Ant Design
 * 
 * ============================================
 */