import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Signup.css';
const port = 9001;

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
      const response = await axios.post('http://ec2-3-35-47-9.ap-northeast-2.compute.amazonaws.com:'+port+'/worker', {
        username: id,
        password: password,
        nickname: name,
        phoneNumber: phone_number,
        email: email
      });
    
      navigate('/worker/login');
      console.log('Signup successful!', response.data);
    } catch (error) {
      let code = error.response.status;
      if (code === 409) { // 아이디 중복
        setErrorMessage("중복된 아이디입니다.");
      } else if (code === 400) { // 입력 형식 오류
        setErrorMessage("회원가입 형식이 잘못되었습니다.");
      } else { // 서버 오류
        setErrorMessage("서버 오류로 회원가입에 실패하였습니다.");
      }
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