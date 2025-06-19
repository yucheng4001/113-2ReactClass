/**
 * ============================================
 * 產品目錄頁面 - Product Catalog Page (修正版)
 * ============================================
 */

import React, { useState } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Button, 
  Typography, 
  Input, 
  Select, 
  Space,
  Image,
  message,
  Tag
} from 'antd';
import { 
  ShoppingCartOutlined,
  SearchOutlined,
  FilterOutlined
} from '@ant-design/icons';
import { ProductController } from '../controllers/ProductController';
import { colorTheme } from '../theme/colors';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const ProductCatalog = ({ onAddToCart }) => {
  const [productController] = useState(new ProductController());
  const [products, setProducts] = useState(productController.getAllProducts());
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [searchKeyword, setSearchKeyword] = useState('');

  // 安全的圖片回退函數
  const getSafeImageFallback = (product) => {
    const safeName = product?.name || '商品';
    const firstChar = safeName.charAt(0) || '商';
    return `https://via.placeholder.com/300x300/${colorTheme.primary.minimumBlue.slice(1)}/FFFFFF?text=${encodeURIComponent(firstChar)}`;
  };

  // 處理圖片載入錯誤
  const handleImageError = (e, product) => {
    e.target.src = getSafeImageFallback(product);
  };

  // 分類篩選
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(category, searchKeyword);
  };

  // 搜尋功能
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    filterProducts(selectedCategory, keyword);
  };

  // 統一的篩選邏輯
  const filterProducts = (category, keyword) => {
    let filtered = products;

    // 分類篩選
    if (category && category !== '全部') {
      filtered = filtered.filter(product => 
        product.category === category
      );
    }

    // 關鍵字搜尋
    if (keyword) {
      const lowerKeyword = keyword.toLowerCase();
      filtered = filtered.filter(product =>
        (product.name && product.name.toLowerCase().includes(lowerKeyword)) ||
        (product.description && product.description.toLowerCase().includes(lowerKeyword)) ||
        (product.category && product.category.toLowerCase().includes(lowerKeyword))
      );
    }

    setFilteredProducts(filtered);
  };

  // 添加到購物車
  const handleAddToCart = (product) => {
    if (!product || !product.id) {
      message.error('商品資訊異常，無法添加到購物車');
      return;
    }
    
    onAddToCart(product);
    message.success(`${product.name} 已添加到購物車！`);
  };

  // 獲取分類列表
  const categories = productController.getCategories();

  return (
    <div style={{ 
      padding: '24px',
      background: colorTheme.background.primary,
      minHeight: '80vh'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* 頁面標題 */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={2} style={{ 
            color: colorTheme.primary.richBlack,
            marginBottom: '8px'
          }}>
            🛍️ 產品目錄
          </Title>
          <Text style={{ 
            fontSize: '16px',
            color: colorTheme.primary.minimumBlue
          }}>
            精選電腦周邊商品，品質保證
          </Text>
        </div>

        {/* 搜尋和篩選區域 */}
        <Card 
          style={{ 
            marginBottom: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(4, 42, 43, 0.1)'
          }}
          bodyStyle={{ padding: '20px' }}
        >
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Search
                placeholder="搜尋商品名稱、描述..."
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={handleSearch}
                style={{ width: '100%' }}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                size="large"
                style={{ width: '100%' }}
                suffixIcon={<FilterOutlined />}
              >
                {categories.map(category => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col xs={24} md={8}>
              <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                <Text>
                  共找到 <Text strong style={{ color: colorTheme.primary.mandarin }}>
                    {filteredProducts.length}
                  </Text> 件商品
                </Text>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* 商品網格 */}
        <Row gutter={[24, 24]}>
          {filteredProducts.map(product => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <Card
                hoverable
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(4, 42, 43, 0.1)',
                  transition: 'all 0.3s ease',
                  border: `1px solid ${colorTheme.primary.lightCyan}`
                }}
                bodyStyle={{ padding: 0 }}
                cover={
                  <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                    <Image
                      src={product.image}
                      alt={product.name || '商品圖片'}
                      style={{ 
                        width: '100%', 
                        height: '200px', 
                        objectFit: 'cover'
                      }}
                      preview={false}
                      fallback={getSafeImageFallback(product)}
                      onError={(e) => handleImageError(e, product)}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px'
                    }}>
                      <Tag color={colorTheme.primary.minimumBlue}>
                        {product.category || '未分類'}
                      </Tag>
                    </div>
                  </div>
                }
              >
                <div style={{ padding: '16px' }}>
                  <Title level={4} style={{ 
                    margin: '0 0 8px 0',
                    color: colorTheme.primary.richBlack,
                    fontSize: '16px',
                    height: '48px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical'
                  }}>
                    {product.name || '未命名商品'}
                  </Title>
                  
                  <Text 
                    type="secondary" 
                    style={{ 
                      fontSize: '14px',
                      height: '40px',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      lineHeight: '20px'
                    }}
                  >
                    {product.description || '暫無商品描述'}
                  </Text>
                  
                  <div style={{ 
                    marginTop: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <Text strong style={{ 
                      fontSize: '18px',
                      color: colorTheme.primary.mandarin
                    }}>
                      NT$ {(product.price || 0).toLocaleString()}
                    </Text>
                    
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      onClick={() => handleAddToCart(product)}
                      style={{
                        background: colorTheme.gradients.secondary,
                        borderColor: 'transparent',
                        borderRadius: '6px'
                      }}
                    >
                      加入購物車
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 無商品提示 */}
        {filteredProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: colorTheme.background.card,
            borderRadius: '12px',
            marginTop: '24px'
          }}>
            <Text style={{ 
              fontSize: '16px',
              color: colorTheme.primary.minimumBlue
            }}>
              😔 沒有找到符合條件的商品，請嘗試其他關鍵字或分類
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;

/* 
 * ============================================
 * 版權聲明 | Copyright Notice
 * ============================================
 * 
 * © 2025 誠品電腦周邊 版權所有
 * © 2025 Eslite Computer Peripherals. All rights reserved.
 * 
 * 產品目錄展示系統 - Enhanced with Ant Design
 * Product catalog display system - Enhanced with Ant Design
 * 
 * ============================================
 */