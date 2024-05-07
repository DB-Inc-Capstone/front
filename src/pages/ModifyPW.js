import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './ModifyPW.css'

const ModifyPW = () => {
    const [pswd, setPW] = useState('');
    const [check_pswd, checkPW] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/worker/modifypw', {
                pswd,
                check_pswd
            });

            console.log('ModifyPW successful!', response.data);
            // 여기에서 로그인 성공 후의 동작을 수행
            navigate('/worker/login');
        } catch (error) {
            console.error('Error during ModifyPW:', error.response ? error.response.data : error.message);
            // 여기에서 오류 처리를 수행
        }
    };

    return (
        <div className="ModifyPW-container">
            <form className="ModifyPW-form" onSubmit={handleSubmit}>
                <label>
                    <div className="ModifyPW-namebox">비밀번호</div>
                    <input
                        type="text"
                        value={pswd}
                        onChange={(e) => setPW(e.target.value)}
                    />
                </label>

                <label>
                    <div className="ModifyPW-namebox">비밀번호 확인</div>
                    <input
                        type="password"
                        value={check_pswd}
                        onChange={(e) => checkPW(e.target.value)}
                    />
                </label>
    
                <br />
                <br />

                <button
                    className="ModifyPW-button"
                    type="submit">
                    확인
                </button>
            </form>
        </div>

    );
};

export default ModifyPW;