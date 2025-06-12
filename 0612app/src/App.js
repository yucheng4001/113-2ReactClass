import logo from './logo.svg';
import './App.css';
import { useTranslation } from "react-i18next";
import { UseSimpleForm } from './asimpleform';
import MyFormPage from './MyFormPage';
import Qrcode from './Qrcode';

function App() {

  const { t,i18n } = useTranslation();

  return (
    <div className="App">
      <h1>{t('hello')}</h1>
      <h1>{t('welcome')}</h1>
      <div>
        <button onClick={() => i18n.changeLanguage('en')} type='button'>英文</button>
        <button onClick={() => i18n.changeLanguage('zh')} type='button'>中文</button>
        <button onClick={() => i18n.changeLanguage('es')} type='button'>西班牙文</button>
        <button onClick={() => i18n.changeLanguage('jp')} type='button'>日文</button>
        <button onClick={() => i18n.changeLanguage('ru')} type='button'>俄語</button> 
        <button onClick={() => i18n.changeLanguage('fr')} type='button'>法語</button>  
        </div>
        <div>
          <h2>表單演示</h2>
          <MyFormPage />
          <Qrcode />
        </div>
    </div>
  );
}

export default App;
