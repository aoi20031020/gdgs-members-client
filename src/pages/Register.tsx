import React from "react";

function Register() {
  return (
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

export default Register;
