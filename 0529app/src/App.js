import React, { useState } from 'react';
import { 
  Layout, Menu, Button, Space, Divider, Flex, Radio, Form, Input, Select,
  Typography, Card, theme, Tabs
} from 'antd';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { Option } = Select;

const App = () => {
  const { token } = theme.useToken();
  const [activeKey, setActiveKey] = useState('button');
  
  // 標籤頁項目定義
  const tabItems = [
    {
      key: 'button',
      label: '按鈕展示',
      children: <ButtonDemo />
    },
    {
      key: 'block',
      label: '區塊按鈕',
      children: <BlockButtonDemo />
    },
    {
      key: 'flex',
      label: '小間距按鈕(Flex)',
      children: <FlexButtonDemo />
    },
    {
      key: 'example',
      label: '表單範例',
      children: <FormDemo />
    },
    {
      key: 'settings',
      label: '設定',
      children: <SettingsDemo />
    },
    {
      key: 'docs',
      label: 'Ant Design 官網',
      children: <DocsDemo />
    }
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        background: token.colorBgContainer,
        paddingInline: 24,
        height: 'auto',
        lineHeight: '1.5'
      }}>
        <div style={{ margin: '16px 0' }}>
          <Title level={3} style={{ margin: 0 }}>Ant Design 按鈕與間距展示</Title>
        </div>
      </Header>
      
      <Content style={{ padding: '16px 24px' }}>
        <Tabs 
          activeKey={activeKey}
          onChange={setActiveKey}
          items={tabItems}
          size="large"
          type="card"
        />
      </Content>

    </Layout>
  );
};

// 按鈕展示組件
const ButtonDemo = () => (
  <div>
    <Flex gap="small" wrap>
      <Button type="primary">主要按鈕</Button>
      <Button>預設按鈕</Button>
      <Button type="dashed">虛線按鈕</Button>
      <Button type="text">文字按鈕</Button>
      <Button type="link" a href="https://ant.design/index-cn" target="_blank" rel="noopener noreferrer">連結按鈕</Button>
    </Flex>
  </div>
);

// 區塊按鈕展示
const BlockButtonDemo = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Card style={{ marginBottom: 16, background: '#e6f4ff', textAlign: 'center', padding: 16 }}>
      區塊按鈕 1
    </Card>
    
    <Card style={{ background: '#e6f4ff', textAlign: 'center', padding: 16 }}>
      區塊按鈕 2
    </Card>
  </Space>
);

// Flex 間距按鈕展示
const FlexButtonDemo = () => (
  <Flex gap="small" wrap>
    <Button type="primary">按鈕 1</Button>
    <Button type="primary">按鈕 2</Button>
    <Button type="primary">按鈕 3</Button>
  </Flex>
);

// 表單範例
const FormDemo = () => (
  <Card title="表單示例" style={{ maxWidth: 500 }}>
    <Form layout="vertical">
      <Form.Item label="帳號" required>
        <Input placeholder="請輸入帳號" />
      </Form.Item>
      
      <Form.Item label="密碼" required>
        <Input.Password placeholder="請輸入密碼" />
      </Form.Item>
      
      <Form.Item>
        <Button type="primary">提交</Button>
      </Form.Item>
    </Form>
  </Card>
);

// 設定展示
const SettingsDemo = () => (
  <Card title="設定選項">
    <Space direction="vertical" style={{ width: '100%' }}>
      <div>
        <Radio.Group defaultValue="a">
          <Radio.Button value="a">選項 A</Radio.Button>
          <Radio.Button value="b">選項 B</Radio.Button>
          <Radio.Button value="c">選項 C</Radio.Button>
        </Radio.Group>
      </div>
      
      <div>
        <Select 
          defaultValue="theme1" 
          style={{ width: 200 }}
          options={[
            { value: 'theme1', label: '預設主題' },
            { value: 'theme2', label: '暗色主題' },
            { value: 'theme3', label: '自定義主題' }
          ]}
        />
      </div>
    </Space>
  </Card>
);

// 文檔展示
const DocsDemo = () => (
  <Card>
    <Space direction="vertical">
      <Title level={4}>Ant Design 官方文檔</Title>
      <p>更多使用方式請參考 Ant Design 官方文檔</p>
      <a href="https://ant.design/index-cn" target="_blank" rel="noopener noreferrer">
        <Button type="primary">訪問官網</Button>
      </a>
    </Space>
  </Card>
);


export default App;