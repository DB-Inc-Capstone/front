import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './MenuBar.css';

const MenuBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeButton, setActiveButton] = useState("taskBoard");
    const [selectedText, setSelectedText] = useState("작업보드");

    useEffect(() => {
        switch (location.pathname) {
            case "/work":
                setActiveButton("taskBoard");
                setSelectedText("작업보드");
                break;
            case "/work/worklist":
                setActiveButton("taskList");
                setSelectedText("작업리스트");
                break;
            case "/work/issue":
                setActiveButton("issues");
                setSelectedText("이슈");
                break;
            case "/work/dashboard":
                setActiveButton("dashboard");
                setSelectedText("대시보드");
                break;
            // 다른 페이지에 대한 설정 추가
            default:
                setActiveButton("main");
                setSelectedText("홈");
        }
    }, [location.pathname]);

    const handleTaskBoardClick = () => {
        setActiveButton("taskBoard");
        setSelectedText("작업보드");
        navigate("/work");
    };
    
    const handleTaskListClick = () => {
        setActiveButton("taskList");
        setSelectedText("작업리스트");
        navigate("/work/worklist");
    };
    
    const handleIssuesClick = () => {
        // 이슈 버튼이 클릭되었을 때 실행될 코드
        setActiveButton("issues");
        setSelectedText("이슈");
        navigate("/work/issue");
    };

    const handleDashboardClick = () => {
        // 대시보드 버튼이 클릭되었을 때 실행될 코드
        setActiveButton("dashboard");
        setSelectedText("대시보드");
        navigate("/work/dashboard");
    };
    
    const handleLogout = () => {
        // 로그아웃 버튼이 클릭되었을 때 실행될 코드
        setActiveButton("logout");
        navigate("/worker/login");
    };

    const handleMainClick = () => {
        // 메인 버튼이 클릭되었을 때 실행될 코드
        setActiveButton("main");
    };

    return (
        <div>
            <div className="menu-bar">
                <button className={activeButton === "taskBoard" ? "active" : ""} onClick={handleTaskBoardClick}>작업보드</button>
                <button className={activeButton === "taskList" ? "active" : ""} onClick={handleTaskListClick}>작업리스트</button>
                <button className={activeButton === "issues" ? "active" : ""} onClick={handleIssuesClick}>이슈</button>
                <button className={activeButton === "dashboard" ? "active" : ""} onClick={handleDashboardClick}>대시보드</button>
                <button className={activeButton === "logout" ? "active" : ""} onClick={handleLogout}>로그아웃</button>
            </div>
            <div className="search-bar">
                <button className={activeButton === "main" ? "active" : ""} onClick={handleMainClick}>{selectedText}</button>
            </div>
        </div>
    );
};

export default MenuBar;
