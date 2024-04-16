// MenuBar.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

import './MenuBar.css';

const MenuBar = () => {
    const navigate = useNavigate();

    const handleTaskBoardClick = () => {
        // 작업보드 버튼이 클릭되었을 때 실행될 코드
    };
    
    const handleTaskListClick = () => {
        navigate("/work/worklist");
    };
    
    const handleTimelineClick = () => {
        // 타임라인 버튼이 클릭되었을 때 실행될 코드
    };
    
    const handleIssuesClick = () => {
        // 이슈 버튼이 클릭되었을 때 실행될 코드
    };
    
    const handleLogout = () => {
        // 로그아웃 버튼이 클릭되었을 때 실행될 코드
    };

    const handleMainClick = () => {
        // 메인 버튼이 클릭되었을 때 실행될 코드
    };

    return (
        <div>
            <div className="menu-bar">
                <button onClick={handleTaskBoardClick}>작업보드</button>
                <button onClick={handleTaskListClick}>작업리스트</button>
                <button onClick={handleTimelineClick}>타임라인</button>
                <button onClick={handleIssuesClick}>이슈</button>
                <button onClick={handleLogout}>로그아웃</button>
            </div>
            <div className="search-bar">
                <button onClick={handleMainClick}>작업보드</button>
            </div>
        </div>
    );
};

export default MenuBar;
