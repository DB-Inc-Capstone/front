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
  const [phone_number, setPhone] = useState('');
  const [auth_number, setAuth] = useState('');
  const navigate = useNavigate();
  
  const handleAuth = async (e) => {
    e.preventDefault();
    console.log(phone_number);

    try {
        const response = await axios.post('https://localhost:3000/worker/findID', {
            phone_number
        });

        // 여기에서 인증 번호 전송 동작을 수행

    } catch (error) {
        console.error('Error during Login:', error.response ? error.response.data : error.message);
        // 여기에서 오류 처리를 수행
    }
};

const handleAuthSubmit = async (e) => {
    e.preventDefault();
    console.log(auth_number);

    try {
        const response = await axios.post('https://localhost:3000/worker/signup', {
            auth_number
        });

        console.log('Authentication successful!', response.data);
        // 여기에서 인증 성공 후의 동작을 수행
    } catch (error) {
        console.error('Error during Login:', error.response ? error.response.data : error.message);
        // 여기에서 오류 처리를 수행
    }
};
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

        <label>
          <div className="Signup-namebox">핸드폰 번호</div>
          <input
            type="text"
            value={phone_number}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button
            className="Signup-button"
            type="submit"
            onClick={handleAuth}>
            인증
          </button>
        </label>

        <label>
          <div className="Signup-namebox">인증 번호</div>
          <input
            type="text"
            value={auth_number}
            onChange={(e) => setAuth(e.target.value)}
          />
          <button
            className="Signup-button"
            type="submit"
            onClick={handleAuthSubmit}>
            확인
          </button>
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