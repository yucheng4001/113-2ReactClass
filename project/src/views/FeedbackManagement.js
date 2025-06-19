/**
 * ============================================
 * 回饋管理頁面 - Feedback Management Page
 * ============================================
 */

import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Table, 
  Typography, 
  Tag, 
  Space, 
  Button, 
  message,
  Select,
  Rate,
  Modal,
  Statistic,
  Row,
  Col
} from 'antd';
import { 
  MessageOutlined,
  EyeOutlined,
  DeleteOutlined,
  ReloadOutlined,
  StarOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';
import { colorTheme } from '../theme/colors';
import { feedbackController } from '../controllers/FeedbackController';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

const FeedbackManagement = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [stats, setStats] = useState({});

  // 載入回饋列表
  const loadFeedbacks = () => {
    setLoading(true);
    try {
      const feedbackList = feedbackController.getAllFeedbacks();
      const statsData = feedbackController.getFeedbackStats();
      setFeedbacks(feedbackList);
      setStats(statsData);
    } catch (error) {
      message.error('載入回饋列表失敗');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  // 狀態標籤顏色
  const getStatusColor = (status) => {
    const colors = {
      'pending': 'orange',
      'reviewed': 'blue', 
      'resolved': 'green'
    };
    return colors[status] || 'default';
  };

  // 狀態中文標籤
  const getStatusText = (status) => {
    const texts = {
      'pending': '待處理',
      'reviewed': '已查看',
      'resolved': '已解決'
    };
    return texts[status] || status;
  };

  // 更新回饋狀態
  const handleStatusChange = (feedbackId, newStatus) => {
    try {
      feedbackController.updateFeedbackStatus(feedbackId, newStatus);
      message.success('狀態更新成功');
      loadFeedbacks();
    } catch (error) {
      message.error(error.message);
    }
  };

  // 刪除回饋
  const handleDeleteFeedback = (feedbackId, subject) => {
    Modal.confirm({
      title: '確認刪除',
      content: `確定要刪除回饋「${subject}」嗎？此操作無法撤銷。`,
      okText: '確認刪除',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => {
        try {
          feedbackController.deleteFeedback(feedbackId);
          message.success('回饋已刪除');
          loadFeedbacks();
        } catch (error) {
          message.error(error.message);
        }
      }
    });
  };

  // 查看回饋詳情
  const handleViewDetails = (feedback) => {
    setSelectedFeedback(feedback);
    setModalVisible(true);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '用戶',
      dataIndex: 'username',
      key: 'username',
      render: (text, record) => (
        <div>
          <Text strong>{text}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '12px' }}>
            {record.email}
          </Text>
        </div>
      ),
    },
    {
      title: '主題',
      dataIndex: 'subject',
      key: 'subject',
      ellipsis: true,
    },
    {
      title: '評分',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <Rate 
          disabled 
          value={rating} 
          style={{ fontSize: '16px', color: colorTheme.primary.mandarin }}
        />
      ),
      width: 120,
    },
    {
      title: '狀態',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {getStatusText(status)}
        </Tag>
      ),
      width: 100,
    },
    {
      title: '提交時間',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleString('zh-TW'),
      width: 150,
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
            style={{ color: colorTheme.primary.minimumBlue }}
          >
            查看
          </Button>
          <Select
            value={record.status}
            size="small"
            style={{ width: 90 }}
            onChange={(value) => handleStatusChange(record.id, value)}
          >
            <Option value="pending">待處理</Option>
            <Option value="reviewed">已查看</Option>
            <Option value="resolved">已解決</Option>
          </Select>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteFeedback(record.id, record.subject)}
          >
            刪除
          </Button>
        </Space>
      ),
      width: 200,
    },
  ];

  return (
    <div style={{ 
      padding: '24px',
      background: colorTheme.background.primary,
      minHeight: '80vh'
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto'
      }}>
        {/* 統計卡片 */}
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          <Col xs={24} sm={12} md={6}>
            <Card style={{ borderRadius: '8px' }}>
              <Statistic
                title="總回饋數"
                value={stats.total}
                prefix={<MessageOutlined style={{ color: colorTheme.primary.minimumBlue }} />}
                valueStyle={{ color: colorTheme.primary.minimumBlue }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card style={{ borderRadius: '8px' }}>
              <Statistic
                title="待處理"
                value={stats.pending}
                prefix={<ClockCircleOutlined style={{ color: '#faad14' }} />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card style={{ borderRadius: '8px' }}>
              <Statistic
                title="已解決"
                value={stats.resolved}
                prefix={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card style={{ borderRadius: '8px' }}>
              <Statistic
                title="平均評分"
                value={stats.avgRating}
                suffix="/ 5.0"
                prefix={<StarOutlined style={{ color: colorTheme.primary.mandarin }} />}
                valueStyle={{ color: colorTheme.primary.mandarin }}
              />
            </Card>
          </Col>
        </Row>

        {/* 主要內容卡片 */}
        <Card
          style={{
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(4, 42, 43, 0.1)'
          }}
        >
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '24px' 
          }}>
            <Title level={2} style={{ 
              color: colorTheme.primary.richBlack,
              margin: 0
            }}>
              💬 回饋管理
            </Title>
            <Button
              icon={<ReloadOutlined />}
              onClick={loadFeedbacks}
              loading={loading}
              style={{ borderColor: colorTheme.primary.minimumBlue }}
            >
              重新載入
            </Button>
          </div>

          <Table
            columns={columns}
            dataSource={feedbacks}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showTotal: (total) => `共 ${total} 條回饋`,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
          />
        </Card>

        {/* 回饋詳情彈窗 */}
        <Modal
          title={
            <Space>
              <MessageOutlined style={{ color: colorTheme.primary.minimumBlue }} />
              回饋詳情
            </Space>
          }
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setModalVisible(false)}>
              關閉
            </Button>
          ]}
          width={600}
        >
          {selectedFeedback && (
            <div>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Text strong>用戶信息：</Text>
                  <div style={{ marginTop: '8px' }}>
                    <Text>{selectedFeedback.username}</Text>
                    <br />
                    <Text type="secondary">{selectedFeedback.email}</Text>
                  </div>
                </div>

                <div>
                  <Text strong>回饋主題：</Text>
                  <div style={{ marginTop: '8px' }}>
                    <Text>{selectedFeedback.subject}</Text>
                  </div>
                </div>

                <div>
                  <Text strong>滿意度評分：</Text>
                  <div style={{ marginTop: '8px' }}>
                    <Rate 
                      disabled 
                      value={selectedFeedback.rating} 
                      style={{ color: colorTheme.primary.mandarin }}
                    />
                    <Text style={{ marginLeft: '8px' }}>
                      ({selectedFeedback.rating}/5)
                    </Text>
                  </div>
                </div>

                <div>
                  <Text strong>詳細內容：</Text>
                  <div style={{ 
                    marginTop: '8px',
                    padding: '12px',
                    background: colorTheme.background.secondary,
                    borderRadius: '6px',
                    border: `1px solid ${colorTheme.primary.lightCyan}`
                  }}>
                    <Paragraph style={{ margin: 0 }}>
                      {selectedFeedback.message}
                    </Paragraph>
                  </div>
                </div>

                <div>
                  <Text strong>提交時間：</Text>
                  <div style={{ marginTop: '8px' }}>
                    <Text>{new Date(selectedFeedback.createdAt).toLocaleString('zh-TW')}</Text>
                  </div>
                </div>

                <div>
                  <Text strong>當前狀態：</Text>
                  <div style={{ marginTop: '8px' }}>
                    <Tag color={getStatusColor(selectedFeedback.status)}>
                      {getStatusText(selectedFeedback.status)}
                    </Tag>
                  </div>
                </div>
              </Space>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default FeedbackManagement;