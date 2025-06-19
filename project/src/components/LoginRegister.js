import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserController } from '../controllers/UserController';

const LoginRegister = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const userController = new UserController();

  // 登入表單驗證
  const loginValidationSchema = Yup.object({
    usernameOrEmail: Yup.string()
      .required('請輸入用戶名或電子郵件'),
    password: Yup.string()
      .min(6, '密碼至少需要6個字元')
      .required('請輸入密碼')
  });

  // 註冊表單驗證
  const registerValidationSchema = Yup.object({
    username: Yup.string()
      .min(3, '用戶名至少需要3個字元')
      .max(20, '用戶名不能超過20個字元')
      .required('請輸入用戶名'),
    email: Yup.string()
      .email('請輸入有效的電子郵件地址')
      .required('請輸入電子郵件'),
    password: Yup.string()
      .min(6, '密碼至少需要6個字元')
      .required('請輸入密碼'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], '密碼確認不相符')
      .required('請確認密碼')
  });

  // 處理登入
  const handleLogin = async (values, { setSubmitting, resetForm }) => {
    try {
      const user = userController.login(values);
      setMessage(`歡迎回來，${user.username}！`);
      setMessageType('success');
      resetForm();
      
      // 通知父組件登入成功
      if (onLoginSuccess) {
        onLoginSuccess(user);
      }
    } catch (error) {
      setMessage(error.message);
      setMessageType('error');
    } finally {
      setSubmitting(false);
    }
  };

  // 處理註冊
  const handleRegister = async (values, { setSubmitting, resetForm }) => {
    try {
      const newUser = userController.register(values);
      setMessage(`註冊成功！歡迎，${newUser.username}！`);
      setMessageType('success');
      resetForm();
      
      // 註冊成功後自動切換到登入
      setTimeout(() => {
        setIsLogin(true);
        setMessage('');
      }, 2000);
    } catch (error) {
      setMessage(error.message);
      setMessageType('error');
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setMessage('');
    setMessageType('');
  };

  return (
    <div className="login-register">
      <div className="form-container">
        <h2>{isLogin ? '登入' : '註冊'}</h2>
        
        {message && (
          <div className={`message ${messageType}`}>
            {message}
          </div>
        )}

        {isLogin ? (
          // 登入表單
          <Formik
            initialValues={{
              usernameOrEmail: '',
              password: ''
            }}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="auth-form">
                <div className="form-group">
                  <Field
                    type="text"
                    name="usernameOrEmail"
                    placeholder="用戶名或電子郵件"
                    className="form-input"
                  />
                  <ErrorMessage name="usernameOrEmail" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <Field
                    type="password"
                    name="password"
                    placeholder="密碼"
                    className="form-input"
                  />
                  <ErrorMessage name="password" component="div" className="error-message" />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="submit-btn"
                >
                  {isSubmitting ? '登入中...' : '登入'}
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          // 註冊表單
          <Formik
            initialValues={{
              username: '',
              email: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={registerValidationSchema}
            onSubmit={handleRegister}
          >
            {({ isSubmitting }) => (
              <Form className="auth-form">
                <div className="form-group">
                  <Field
                    type="text"
                    name="username"
                    placeholder="用戶名"
                    className="form-input"
                  />
                  <ErrorMessage name="username" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <Field
                    type="email"
                    name="email"
                    placeholder="電子郵件"
                    className="form-input"
                  />
                  <ErrorMessage name="email" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <Field
                    type="password"
                    name="password"
                    placeholder="密碼"
                    className="form-input"
                  />
                  <ErrorMessage name="password" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="確認密碼"
                    className="form-input"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="error-message" />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="submit-btn"
                >
                  {isSubmitting ? '註冊中...' : '註冊'}
                </button>
              </Form>
            )}
          </Formik>
        )}

        <div className="switch-mode">
          <p>
            {isLogin ? '還沒有帳號？' : '已有帳號？'}
            <button onClick={switchMode} className="switch-btn">
              {isLogin ? '註冊' : '登入'}
            </button>
          </p>
        </div>

        {isLogin && (
          <div className="demo-info">
            <h4>測試帳號：</h4>
            <p>用戶名：admin，密碼：admin123</p>
            <p>用戶名：user1，密碼：password123</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;