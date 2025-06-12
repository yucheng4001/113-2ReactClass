import React from "react";
import * as Yup from "yup";
import { Input, Form } from "antd";
import YupValidatedForm from "./YupValidatedForm";

// Yup 驗證規則
const contactFormSchema = Yup.object({
  name: Yup.string()
    .required("姓名是必填的")
    .max(15, "必須在15字以內！")
    .min(3, "必須在3字以上！！")
    .trim(),
  email: Yup.string()
    .required("電子郵件是必填的")
    .email("無效的電子郵件格式")
    .trim(),
  phone: Yup.string()
    .required("電話是必填的")
    .matches(/^[0-9]{10}$/, "電話必須是10位數字")
    .trim(),
  message: Yup.string().trim(),
});

// 初始值
const contactFormInitialValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function MyFormPage() {
  const handleSubmit = (values) => {
    // 這裡可以送出到 API 或其他處理
    console.log("送出資料：", values);
  };

  return (
    <YupValidatedForm
      validationSchema={contactFormSchema}
      initialValues={contactFormInitialValues}
      onSubmit={handleSubmit}
      submitText="送出"
      successMessage="表單驗證成功！"
    >
      {(formik) => (
        <>
          <Form.Item
            label="姓名"
            validateStatus={formik.errors.name && formik.touched.name ? "error" : ""}
            help={formik.touched.name && formik.errors.name}
          >
            <Input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="請輸入姓名"
            />
          </Form.Item>

          <Form.Item
            label="電子郵件"
            validateStatus={formik.errors.email && formik.touched.email ? "error" : ""}
            help={formik.touched.email && formik.errors.email}
          >
            <Input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="請輸入電子郵件"
            />
          </Form.Item>

          <Form.Item
            label="電話"
            validateStatus={formik.errors.phone && formik.touched.phone ? "error" : ""}
            help={formik.touched.phone && formik.errors.phone}
          >
            <Input
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="請輸入10位數字電話"
            />
          </Form.Item>

          <Form.Item
            label="留言"
            validateStatus={formik.errors.message && formik.touched.message ? "error" : ""}
            help={formik.touched.message && formik.errors.message}
          >
            <Input.TextArea
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="請輸入留言"
              rows={4}
            />
          </Form.Item>
        </>
      )}
    </YupValidatedForm>
  );
}