import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Signup.css';

const Signup = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id, password, email, name);

    navigate('/worker/login'); // 임시로 회원가입 버튼 누르면 이동하게끔
    try {
      const response = await axios.post('https://localhost:3000/worker/signup', {
        id,
        password,
        email,
        name,
      });

      console.log('SignUp successful!', response.data);
      // 여기에서 회원가입 성공 후의 동작을 수행
      //navigate('/worker/login');

    } catch (error) {
      console.error('Error during SignUp:', error.response ? error.response.data : error.message);
      // 여기에서 오류 처리를 수행
    }
  };

  return (
    <div className="Signup-container">
      <form className="Signup-form">
        <label>
          <div className="Signup-namebox">아이디</div>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>

        <label>
          <div className="Signup-namebox">비밀번호</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label>
          <div className="Signup-namebox">이메일</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          <div className="Signup-namebox">이름</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <br />
        <br />
        <br />

        <button
          className="Signup-submit"
          type="submit"
          onClick={handleSubmit}>
          회원가입
        </button>
      </form>
    </div>

  );
};

export default Signup;