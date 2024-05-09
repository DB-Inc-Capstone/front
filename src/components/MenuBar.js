import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './MenuBar.css';

const MenuBar = () => {
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState("taskBoard");
    const [selectedText, setSelectedText] = useState("작업보드");

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
    
    const handleTimelineClick = () => {
        // 타임라인 버튼이 클릭되었을 때 실행될 코드
        setActiveButton("timeline");
        setSelectedText("타임라인");
    };
    
    const handleIssuesClick = () => {
        // 이슈 버튼이 클릭되었을 때 실행될 코드
        setActiveButton("issues");
        setSelectedText("이슈");
        navigate("/work/issue");
    };
    
    const handleLogout = () => {
        // 로그아웃 버튼이 클릭되었을 때 실행될 코드
        setActiveButton("logout");
    };

    const handleMainClick = () => {
        // 메인 버튼이 클릭되었을 때 실행될 코드
        setActiveButton("main");
    };

    useEffect(() => {
        setActiveButton("taskBoard");
        setSelectedText("작업보드");
    }, []);

    return (
        <div>
            <div className="menu-bar">
                <button className={activeButton === "taskBoard" ? "active" : ""} onClick={handleTaskBoardClick}>작업보드</button>
                <button className={activeButton === "taskList" ? "active" : ""} onClick={handleTaskListClick}>작업리스트</button>
                <button className={activeButton === "timeline" ? "active" : ""} onClick={handleTimelineClick}>타임라인</button>
                <button className={activeButton === "issues" ? "active" : ""} onClick={handleIssuesClick}>이슈</button>
                <button className={activeButton === "logout" ? "active" : ""} onClick={handleLogout}>로그아웃</button>
            </div>
            <div className="search-bar">
                <button className={activeButton === "main" ? "active" : ""} onClick={handleMainClick}>{selectedText}</button>
            </div>
        </div>
    );
};

export default MenuBar;
