/**
 * ============================================
 * 用戶管理頁面 - User Management Page
 * ============================================
 */

import React, { useState, useEffect } from 'react';
import { Card, Table, Typography, Tag, Space, Button, message } from 'antd';
import { UserOutlined, DeleteOutlined, ReloadOutlined } from '@ant-design/icons';
import { userController } from '../controllers/UserController';
import { colorTheme } from '../theme/colors';

const { Title, Text } = Typography;

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // 載入用戶列表
  const loadUsers = () => {
    setLoading(true);
    try {
      const userList = userController.getAllUsers();
      console.log('載入用戶列表:', userList); // 調試用
      setUsers(userList);
    } catch (error) {
      message.error('載入用戶列表失敗');
    } finally {
      setLoading(false);
    }
  };

  // 組件載入時獲取用戶列表
  useEffect(() => {
    loadUsers();
  }, []);

  const handleDeleteUser = (userId, username) => {
    try {
      userController.deleteUser(userId);
      message.success(`用戶 ${username} 已刪除`);
      loadUsers(); // 重新載入列表
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '用戶名',
      dataIndex: 'username',
      key: 'username',
      render: (text) => (
        <Space>
          <UserOutlined style={{ color: colorTheme.primary.minimumBlue }} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: '電子郵件',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '註冊時間',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text, record) => {
        if (record.id === 1 || record.id === 2) {
          return <Tag color="blue">系統預設</Tag>;
        }
        return new Date(record.createdAt).toLocaleString('zh-TW');
      },
    },
    {
      title: '帳號類型',
      key: 'type',
      render: (text, record) => {
        if (record.id === 1) {
          return <Tag color="red">管理員</Tag>;
        } else if (record.id === 2) {
          return <Tag color="green">測試用戶</Tag>;
        } else {
          return <Tag color="default">註冊用戶</Tag>;
        }
      },
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        if (record.id === 1 || record.id === 2) {
          return <Text type="secondary">系統帳號</Text>;
        }
        return (
          <Button
            type="text"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record.id, record.username)}
          >
            刪除
          </Button>
        );
      },
    },
  ];

  const stats = userController.getUserStats();

  return (
    <div style={{ 
      padding: '24px',
      background: colorTheme.background.primary,
      minHeight: '80vh'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
        <Card
          style={{
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(4, 42, 43, 0.1)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <Title level={2} style={{ 
              color: colorTheme.primary.richBlack,
              margin: 0
            }}>
              👥 用戶管理
            </Title>
            <Button
              icon={<ReloadOutlined />}
              onClick={loadUsers}
              loading={loading}
              style={{ borderColor: colorTheme.primary.minimumBlue }}
            >
              重新載入
            </Button>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <Space size="large">
              <div>
                <Text strong>總用戶數：</Text>
                <Tag color={colorTheme.primary.minimumBlue} style={{ fontSize: '14px' }}>
                  {stats.total}
                </Tag>
              </div>
              <div>
                <Text strong>註冊用戶：</Text>
                <Tag color={colorTheme.primary.mandarin} style={{ fontSize: '14px' }}>
                  {stats.registered}
                </Tag>
              </div>
              <div>
                <Text strong>系統用戶：</Text>
                <Tag color="blue" style={{ fontSize: '14px' }}>
                  {stats.system}
                </Tag>
              </div>
            </Space>
          </div>

          <Table
            columns={columns}
            dataSource={users}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showTotal: (total) => `共 ${total} 個用戶`,
              showSizeChanger: true,
              showQuickJumper: true,
            }}
            style={{ marginTop: '16px' }}
          />
        </Card>
      </div>
    </div>
  );
};

export default UserManagement;