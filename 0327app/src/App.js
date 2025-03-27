import logo from './logo.svg';
import './App.css';
import InputTexts from './InputTexts.js';
import Numbers, { NumbersWithLimitByCSS, NumbersWithLimitByHTML } from './numbers.js';
import LoginMessages from './loginMessages.js';
import Shopping from './shopping.js';
import StarRating from './StarRating.js';
import ProductList from './productList.js';

function App() {
  
  return (
    <div>
      <InputTexts/>
      <LoginMessages/>
      <Numbers/>
      <Shopping/>
      <h2>NumbersWithLimitByCSS</h2>
      <NumbersWithLimitByCSS/>
      <h2>NumbersWithLimitByHTML</h2>
      <NumbersWithLimitByHTML/>
      <h2>StarRating</h2>
      <StarRating/>
      <ProductList/>
    </div>
  );
}

export default App;
