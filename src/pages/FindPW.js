import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './FindPW.css'

const FindPW = () => {
    const [phone_number, setPhone] = useState('');
    const [auth_number, setAuth] = useState('');
    const [id, setID] = useState('');
    const navigate = useNavigate();

    const handleReturn = async (e) => {
        navigate("/worker/login");
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        console.log(phone_number);

        try {
            const response = await axios.post('https://localhost:3000/worker/findpw', {
                phone_number
            });

            // 여기에서 인증 번호 전송 동작을 수행

        } catch (error) {
            console.error('Error during Login:', error.response ? error.response.data : error.message);
            // 여기에서 오류 처리를 수행
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(auth_number);
        navigate("/worker/modifypw");

        try {
            const response = await axios.post('https://localhost:3000/worker/findpw', {
                auth_number
            });

            console.log('Authentication successful!', response.data);
            // 여기에서 인증 성공 후의 동작을 수행
        } catch (error) {
            console.error('Error during Login:', error.response ? error.response.data : error.message);
            // 여기에서 오류 처리를 수행
        }
    };

    return (
        <div className="FindPW-container">
            <form className="FindPW-form">
                <label>
                    <div className="FindPW-namebox">아이디</div>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setID(e.target.value)}
                    />
                </label>

                <label>
                    <div className="FindPW-namebox">핸드폰 번호</div>
                    <input
                        type="text"
                        value={phone_number}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <button 
                        className="FindPW-button"
                        type="submit" 
                        onClick={handleAuth}>
                        인증
                    </button>
                </label>

                <label>
                    <div className="FindPW-namebox">인증 번호</div>
                    <input
                        type="text"
                        value={auth_number}
                        onChange={(e) => setAuth(e.target.value)}
                    />
                    <button
                        className="FindPW-button"
                        type="submit"
                        onClick={handleSubmit}>
                        확인
                    </button>
                </label>

                <button
                    className="FindPW-returnbutton"
                    type="button"
                    onClick={handleReturn}>
                    로그인 화면으로 돌아가기
                </button>
            </form>
        </div>
    );
};

export default FindPW;