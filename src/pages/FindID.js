import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './FindID.css'

const FindID = () => {
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
            const response = await axios.post('https://localhost:3000/worker/findid', {
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
        setID("helloworld"); // 인증번호가 올바르면 아이디 표기

        try {
            const response = await axios.post('https://localhost:3000/worker/findid', {
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
        <div className="FindID-container">
            <form className="FindID-form">
                <label>
                    <div className="FindID-namebox">핸드폰 번호</div>
                    <input
                        type="text"
                        value={phone_number}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <button 
                        className="FindID-button"
                        type="submit" 
                        onClick={handleAuth}>
                        인증
                    </button>
                </label>

                <label>
                    <div className="FindID-namebox">인증 번호</div>
                    <input
                        type="text"
                        value={auth_number}
                        onChange={(e) => setAuth(e.target.value)}
                    />
                    <button
                        className="FindID-button"
                        type="submit"
                        onClick={handleSubmit}>
                        확인
                    </button>
                </label>

                <label>
                    <div className="FindID-idbox">아이디</div>
                    <input
                        type="text"
                        value={id}
                        readOnly
                    />
                </label>

                <button
                    className="FindID-returnbutton"
                    type="button"
                    onClick={handleReturn}>
                    로그인 화면으로 돌아가기
                </button>
            </form>
        </div>
    );
};

export default FindID;