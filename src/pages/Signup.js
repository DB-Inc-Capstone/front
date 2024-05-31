import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Signup.css';

const port = 9000;
//const backend_url = `http://ec2-43-202-33-178.ap-northeast-2.compute.amazonaws.com:${port}`;
const backend_url = process.env.REACT_APP_API_GATEWAY_URL;

const Signup = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone_number, setPhone] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleReturn = async (e) => {
    navigate("/worker/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post(`${backend_url}/worker`, {
        username: id,
        password: password,
        nickname: name,
        phoneNumber: phone_number,
        email: email
      });
    
      console.log('Signup successful!', response.data);
      navigate('/worker/login');
    } catch (error) {
      setErrorMessage(error.response.data.message);
      console.error('Error during Signup:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="Signup-container">
      <form className="Signup-form" onSubmit={handleSubmit}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <br />
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
          <div className="Signup-namebox">이름</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <div className="Signup-namebox">핸드폰 번호</div>
            <input
              type="text"
              value={phone_number}
              onChange={(e) => setPhone(e.target.value)}
            />
        </label>

        <br />
        <br />
        <br />

        <button
          className="Signup-submit"
          type="submit">
          회원가입
        </button>
        <button
          className="Signup-returnbutton"
          type="button"
          onClick={handleReturn}>
          로그인 화면으로 돌아가기
          </button>
      </form>
    </div>
  );
};

export default Signup;