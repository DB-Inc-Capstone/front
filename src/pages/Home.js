import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const handlelogin = async (e) => {
        navigate("/worker/login");
    };

    return (
        <div>Home이다! <br />
            <button
                type="button"
                onClick={handlelogin}>
                로그인 화면으로 이동
            </button>
        </div>
    );
};

export default Home;