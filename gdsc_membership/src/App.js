import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


//Appという名前の関数コンポーネントを定義。UIの一部を表現するコンポーネント関数
function App() {


//この関数はJSXを返す。JSXはHTMLに似た構文
return (


//アプリケーションのルーティング（URLに基づいたページ遷移）を管理
  <Router>

    <div className="App">

      <header className="App-header">



  
        {/* 新しいタブでリンクを開きます */}
        <a href="/register" target="_blank"><button className="App-button">メンバー登録</button></a>
        <a href="/members" target="_blank"><button className="App-button">メンバー一覧</button></a>
      </header>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/members" element={<Members />} />
      </Routes>
    </div>
  </Router>
);
}


function Register() {
  return(
  <div className="register-page">
      <h1>メンバー登録ページ</h1>
      <form>
        <label>
          名前:
          <input type="text" name="name" />
        </label>
        <input type="submit" value="登録" />
      </form>
    </div>
  
  );
}


function Members() {
  return (
    <div className="members-page">
      <h1>メンバー一覧ページ</h1>
      <ul>
        <li>メンバー1</li>
        <li>メンバー2</li>
        <li>メンバー3</li>
      </ul>
    </div>
  );
}

export default App;