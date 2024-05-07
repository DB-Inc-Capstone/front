import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './FindPW.css'
const port = 9001;

const FindPW = () => {
    const [id, setID] = useState('');
    const [phone_number, setPhone] = useState('');
    const [pswd, setPW] = useState('');
    const [check_pswd, checkPW] = useState('');
    const [exist, checkExist] = useState(false);
    const navigate = useNavigate();

    const handleReturn = async (e) => {
        navigate("/worker/login");
    };

    const checkID = async (e) => {
        e.preventDefault();

        try { // /worker/checkid 로 변경
            const response = await axios.post('http://ec2-3-35-47-9.ap-northeast-2.compute.amazonaws.com:'+port+'/worker/login', {
                id,
                phone_number
            });

            console.log('FindPW successful!', response.data);
            // 여기에서 인증 번호 전송 동작을 수행
        } catch (error) {
            console.error('Error during FindPW:', error.response ? error.response.data : error.message);
            // 여기에서 오류 처리를 수행
        }
    };

    const SubmitPW = async (e) => {
        e.preventDefault();

        try { // /worker/checkpw 로 변경
            const response = await axios.post('http://localhost:4000/worker/findpw', {
                id,
                phone_number
            });

            console.log('FindPW successful!', response.data);
            // 여기에서 인증 번호 전송 동작을 수행
            navigate('/worker/modifypw');
        } catch (error) {
            console.error('Error during FindPW:', error.response ? error.response.data : error.message);
            // 여기에서 오류 처리를 수행
        }
    }
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
                        onClick={checkID}>
                        확인
                    </button>
                </label>
                <label>
                    <div className="FindPW-namebox">비밀번호</div>
                    <input
                        type="text"
                        value={pswd}
                        onChange={(e) => setPW(e.target.value)}
                    />
                </label>

                <label>
                    <div className="FindPW-namebox">비밀번호 확인</div>
                    <input
                        type="password"
                        value={check_pswd}
                        onChange={(e) => checkPW(e.target.value)}
                    />
                     <button 
                        className="FindPW-button"
                        type="submit"
                        onClick={SubmitPW}>
                        변경
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