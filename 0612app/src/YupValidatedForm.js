import React from "react";
import { useFormik } from "formik";
import { Card, Button, Form, message } from "antd";

/**
 * 通用的 Yup 驗證表單組件
 * 可以接受任何 Yup 架構和表單欄位，提供完整的表單功能
 * 
 * @param {Object} props - 組件的 props
 * @param {Object} props.validationSchema - Yup 驗證架構
 * @param {Object} props.initialValues - 表單初始值
 * @param {Function} props.onSubmit - 表單提交回調函數
 * @param {Function} props.children - 表單欄位的渲染函數，接收 formik 物件
 * @param {string} [props.submitText] - 提交按鈕文字，預設為 "提交"
 * @param {string} [props.successMessage] - 提交成功訊息，預設為 "表單已成功提交！"
 * @param {boolean} [props.autoReset] - 提交成功後是否自動重置表單，預設為 true
 */
const YupValidatedForm = ({
  validationSchema,
  initialValues,
  onSubmit,
  children,
  submitText = "提交",
  successMessage = "表單已成功提交！",
  autoReset = true
}) => {
  // 初始化 Formik 表單管理
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      // 執行自訂的提交邏輯
      onSubmit(values);
      
      // 顯示成功訊息
      message.success(successMessage);
      
      // 根據設定決定是否重置表單
      if (autoReset) {
        resetForm();
      }
    }
  });

  return (
    <Card>
      <form onSubmit={formik.handleSubmit}>
        {/* 透過 children function 傳遞 formik 物件給外部組件 */}
        {children(formik)}
        
        {/* 提交按鈕 */}
        <Form.Item>
          <Button 
            type="primary" 
            htmlType="submit" 
            style={{ width: "100%" }}
            disabled={!formik.isValid || formik.isSubmitting}
          >
            {submitText}
          </Button>
        </Form.Item>
      </form>
    </Card>
  );
};

export default YupValidatedForm; 