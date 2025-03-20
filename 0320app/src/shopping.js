import React, { useState } from 'react';

export default function Shopping() {
  const [Acc, setloginAcc] = useState('');
  const [passw, setpassw] = useState('')
  const [name, setname] = useState('')
  const [number, setNumber] = useState(0);
  const [number1, setNumber1] = useState(0);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const BANANA_PRICE = 5;
  const APPLE_PRICE = 10;
  const totalPrice = number * BANANA_PRICE + number1 * APPLE_PRICE;

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const checkout = () => {
    alert(`已完成購買，總價: ${totalPrice}元`);
    setIsCartOpen(false);
  };

  return (
    <>
      帳號:<input type='text' onChange={(e) => { setloginAcc(e.target.value) }}></input><br></br>
      密碼:<input type='text' onChange={(e) => { setpassw(e.target.value) }}></input><br></br>
      購買人:<input type='text' onChange={(e) => { setname(e.target.value) }}></input>
      <p>帳號:{Acc}<br></br>密碼:{passw}<br></br>購買人:{name}</p>


      <h1>購物車</h1>
      <p>香蕉數量:
        <button onClick={() => setNumber(number + 1)}> +1 </button>
        {number}
        <button onClick={() => setNumber(number - 1)}> -1 </button>
      </p>

      <p>蘋果數量:
        <button onClick={() => setNumber1(number1 + 1)}> +1 </button>
        {number1}
        <button onClick={() => setNumber1(number1 - 1)}> -1 </button>
      </p>

      <button onClick={''}>購買</button>
      <hr></hr>
      <button onClick={openCart}>查看購物車</button>

      {/* 購物車小視窗 */}
      {isCartOpen && (
        <div>
          <div>
            <h2>購物車內容</h2>

            <div>
              {number > 0 && (
                <div>
                  <span>香蕉 x {number}</span>
                  <span>{number * BANANA_PRICE}元</span>
                </div>
              )}

              {number1 > 0 && (
                <div>
                  <span>蘋果 x {number1}</span>
                  <span>{number1 * APPLE_PRICE}元</span>
                </div>
              )}

              {number === 0 && number1 === 0 && (
                <p>購物車是空的</p>
              )}
            </div>

            <div>
              <span>總計:</span>
              <span>{totalPrice}元</span>
            </div>

            <div>
              <button onClick={closeCart}>關閉</button>
              <button onClick={checkout}>結帳</button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}