import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './ResetPW.css'

const port = 9000;
const backend_url = `ec2-43-201-250-5.ap-northeast-2.compute.amazonaws.com:${port}`;

const ResetPW = () => {
    const [id, setID] = useState('');
    const [phone_number, setPhone] = useState('');
    const [pswd, setPW] = useState('');
    const [check_pswd, checkPW] = useState('');
    const [exist, setExist] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleReturn = async (e) => {
        navigate("/worker/login");
    };

    const checkID = async (e) => {
        e.preventDefault();

        try { // /worker/checkid 로 변경
            const response = await axios.post(`${backend_url}/worker/valid`, {
                username: id,
                phoneNumber: phone_number
            });
            setErrorMessage(response.data.message);
            setExist(true);
            console.log('checkID successful!', response.data);
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setExist(false);
            console.error('Error during checkID:', error.response ? error.response.data : error.message);
        }
    };

    const SubmitPW = async (e) => {
        e.preventDefault();

        if (!exist) {
            setErrorMessage("계정 인증을 먼저 진행해주십시오.");
            return;
        }
        
        if (pswd !== check_pswd) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const response = await axios.post(`${backend_url}/worker/resetpw`, {
                username: id,
                phoneNumber: phone_number,
                password: pswd
            });

            setErrorMessage(response.data.message);
            console.log('ResetPW successful!', response.data);
            navigate('/worker/login');
        } catch (error) {
            setErrorMessage(error.response.data.message);
            setExist(false);
            console.error('Error during ResetPW:', error.response ? error.response.data : error.message);
        }
    }
    return (
        <div className="ResetPW-container">
            <form className="ResetPW-form">
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <br />
                <label>
                    <div className="ResetPW-namebox">아이디</div>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setID(e.target.value)}
                    />
                </label>

                <label>
                    <div className="ResetPW-namebox">핸드폰 번호</div>
                    <input
                        type="text"
                        value={phone_number}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <button 
                        className="ResetPW-button"
                        type="submit"
                        onClick={checkID}>
                        인증
                    </button>
                </label>
                <label>
                    <div className="ResetPW-namebox">비밀번호</div>
                    <input
                        type="text"
                        value={pswd}
                        onChange={(e) => setPW(e.target.value)}
                    />
                </label>

                <label>
                    <div className="ResetPW-namebox">비밀번호 확인</div>
                    <input
                        type="password"
                        value={check_pswd}
                        onChange={(e) => checkPW(e.target.value)}
                    />
                    <button 
                        className="ResetPW-button"
                        type="submit"
                        onClick={SubmitPW}>
                        변경
                    </button>
                </label>
                <button
                    className="ResetPW-returnbutton"
                    type="button"
                    onClick={handleReturn}>
                    로그인 화면으로 돌아가기
                </button>
            </form>
        </div>
    );
};

export default ResetPW;