import React, { useEffect, useState } from 'react';
import { Card, Table, Typography, Tag, Space, Button, Statistic, Row, Col, Modal, Descriptions, List, Divider } from 'antd';
import { EyeOutlined, ReloadOutlined, CheckCircleOutlined, ClockCircleOutlined, CarOutlined, DeliveredProcedureOutlined, DollarOutlined } from '@ant-design/icons';
import { orderController } from '../controllers/OrderController';
import { colorTheme } from '../theme/colors';

const { Title, Text } = Typography;

const statusColor = {
  pending: 'default',
  confirmed: 'processing',
  shipped: 'geekblue',
  delivered: 'success',
  cancelled: 'error'
};

const statusText = {
  pending: '待確認',
  confirmed: '已確認',
  shipped: '已出貨',
  delivered: '已送達',
  cancelled: '已取消'
};

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const loadOrders = () => {
    setLoading(true);
    setOrders(orderController.getAllOrders());
    setStats(orderController.getOrderStats());
    setLoading(false);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const columns = [
    { title: '訂單編號', dataIndex: 'id', key: 'id', width: 100 },
    { title: '用戶', dataIndex: 'username', key: 'username', render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.email}</Text>
        </div>
      )
    },
    { 
      title: '收件人', 
      dataIndex: ['shippingAddress', 'name'], 
      key: 'shippingName',
      render: (_, record) => (
        <div>
          <Text>{record.shippingAddress?.name}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>{record.shippingAddress?.phone}</Text>
        </div>
      )
    },
    { title: '金額', dataIndex: 'totalAmount', key: 'totalAmount', render: v => `NT$ ${v.toLocaleString()}` },
    { title: '狀態', dataIndex: 'status', key: 'status', render: v => <Tag color={statusColor[v]}>{statusText[v]}</Tag> },
    { title: '建立時間', dataIndex: 'createdAt', key: 'createdAt', render: t => new Date(t).toLocaleString('zh-TW') },
    { title: '操作', key: 'action', render: (_, record) => (
        <Button icon={<EyeOutlined />} size="small" onClick={() => { setSelectedOrder(record); setModalVisible(true); }}>查看</Button>
      )
    }
  ];

  return (
    <div style={{ padding: 24, background: colorTheme.background.primary, minHeight: '80vh' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Card style={{ borderRadius: 12, boxShadow: '0 4px 12px rgba(4, 42, 43, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <Title level={2} style={{ color: colorTheme.primary.richBlack, margin: 0 }}>📦 訂單管理</Title>
            <Button icon={<ReloadOutlined />} onClick={loadOrders} loading={loading}>重新載入</Button>
          </div>
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} md={4}><Statistic title="總訂單" value={stats.total} prefix={<CheckCircleOutlined />} /></Col>
            <Col xs={24} sm={12} md={4}><Statistic title="待確認" value={stats.pending} prefix={<ClockCircleOutlined />} /></Col>
            <Col xs={24} sm={12} md={4}><Statistic title="已確認" value={stats.confirmed} prefix={<CheckCircleOutlined />} /></Col>
            <Col xs={24} sm={12} md={4}><Statistic title="已出貨" value={stats.shipped} prefix={<CarOutlined />} /></Col>
            <Col xs={24} sm={12} md={4}><Statistic title="已送達" value={stats.delivered} prefix={<DeliveredProcedureOutlined />} /></Col>
            <Col xs={24} sm={12} md={4}><Statistic title="總銷售額" value={`NT$ ${stats.totalRevenue?.toLocaleString() || 0}`} prefix={<DollarOutlined />} /></Col>
          </Row>
          <Table
            columns={columns}
            dataSource={orders}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 10, showTotal: total => `共 ${total} 筆訂單` }}
            style={{ marginTop: 16 }}
          />
        </Card>
      </div>
      <Modal
        open={modalVisible}
        title="訂單詳細資訊"
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>關閉</Button>
        ]}
        width={700}
      >
        {selectedOrder && (
          <>
            <Descriptions title="訂購者資訊" bordered column={1} size="small" style={{ marginBottom: 16 }}>
              <Descriptions.Item label="用戶名稱">{selectedOrder.username}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedOrder.email}</Descriptions.Item>
              <Descriptions.Item label="收件人">{selectedOrder.shippingAddress?.name}</Descriptions.Item>
              <Descriptions.Item label="電話">{selectedOrder.shippingAddress?.phone}</Descriptions.Item>
              <Descriptions.Item label="地址">{selectedOrder.shippingAddress?.city} {selectedOrder.shippingAddress?.address}</Descriptions.Item>
              <Descriptions.Item label="郵遞區號">{selectedOrder.shippingAddress?.postalCode}</Descriptions.Item>
              <Descriptions.Item label="付款方式">{selectedOrder.paymentMethod}</Descriptions.Item>
              <Descriptions.Item label="訂單狀態"><Tag color={statusColor[selectedOrder.status]}>{statusText[selectedOrder.status]}</Tag></Descriptions.Item>
              <Descriptions.Item label="建立時間">{new Date(selectedOrder.createdAt).toLocaleString('zh-TW')}</Descriptions.Item>
            </Descriptions>
            <Divider orientation="left">訂購商品</Divider>
            <List
              dataSource={selectedOrder.items}
              renderItem={item => (
                <List.Item>
                  <Space>
                    <Text strong>{item.name}</Text>
                    <Text type="secondary">x{item.quantity}</Text>
                    <Text>NT$ {item.price.toLocaleString()}</Text>
                  </Space>
                </List.Item>
              )}
            />
            <Divider />
            <div style={{ textAlign: 'right' }}>
              <Text strong style={{ fontSize: 16 }}>總金額：NT$ {selectedOrder.totalAmount.toLocaleString()}</Text>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default OrderManagement;