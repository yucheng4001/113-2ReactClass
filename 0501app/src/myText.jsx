import React, { useContext } from "react";
import { AppContext, ColorContext, CountContext,SizeContext } from "./App";

export function MyText() {
  const color = useContext(ColorContext);
  const username = useContext(AppContext);
  const { count} = useContext(CountContext);
  const fontSize = useContext(SizeContext);
  return (
    <div>
      <h1 style={{ color:color,fontSize:`${fontSize}px`}}>{username}</h1>
      <p>Count: {count}</p>
      {/* 可以選擇在這裡加個按鈕 */}
      {/* <button onClick={addCount}>加一</button> */}
    </div>
  );
}

export default MyText;
