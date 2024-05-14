import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './Login.css'
const port = 9001;

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleFindPW = async (e) => {
        navigate("/worker/resetpw");
    };

    const handleSignup = async (e) => {
        navigate("/worker/signup");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://ec2-3-35-47-9.ap-northeast-2.compute.amazonaws.com:'+port+'/worker/login', {
                username: id,
                password: password
            });
            setErrorMessage(response.data.message);
            console.log('Login successful!', response.data);
        } catch (error) {
            setErrorMessage(error.response.data.message);
            console.error('Error during Login:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="Login-container">
            <form className="Login-form" onSubmit={handleSubmit}>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <br />
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
                    type="submit">
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