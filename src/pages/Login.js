import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './Login.css'

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleFindPW = async (e) => {
        navigate("/worker/findpw");
    };

    const handleSignup = async (e) => {
        navigate("/worker/signup");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(id, password);
        
        try {
            const response = await axios.post('https://localhost:3000/worker/login', {
                id,
                password
            });

            console.log('Login successful!', response.data);
            // 여기에서 로그인 성공 후의 동작을 수행
        } catch (error) {
            console.error('Error during Login:', error.response ? error.response.data : error.message);
            // 여기에서 오류 처리를 수행
        }
    };

    return (
        <div className="Login-container">
            <form className="Login-form">
                <label>
                    <div className="Login-namebox">아이디</div>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                    />
                </label>

                <label>
                    <div className="Login-namebox">비밀번호</div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <br />
                <br />

                <button 
                    className="Login-submit"
                    type="submit"
                    onClick={handleSubmit}>
                    로그인
                </button>
                <button
                    className="Login-button"
                    type="button"
                    onClick={handleFindPW}>
                    비밀번호 찾기
                </button>
                <button
                    className="Login-button"
                    type="button"
                    onClick={handleSignup}>
                    회원가입
                </button>
            </form>
        </div>

    );
};

export default Login;