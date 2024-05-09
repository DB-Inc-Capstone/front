import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import MenuBar from "../components/MenuBar";

function Issue() {
    return (
      <div className="app">
        <aside className="sidebar">
          <nav className="navigation">
            <div className="nav-item">대시보드</div>
            <div className="nav-item">타임 라인</div>
            <div className="nav-item">이슈</div>
            <div className="nav-item">로고아웃</div>
          </nav>
        </aside>
        <main className="main-content">
          <header className="header">
            <div className="header-item">자영 보드</div>
            <div className="search-container">
              <input type="search" className="search-input" placeholder="검색" />
            </div>
          </header>
          <section className="content">
            <div className="board-section">
              <div className="board-header">
                <h2 className="board-title">타임 라인</h2>
                <button className="add-button">+ 믹 할 일</button>
              </div>
              <div className="board-cards">
                {/* Example card */}
                <div className="card"></div>
                {/* Additional cards */}
              </div>
            </div>
            <div className="info-section">
              <button className="info-button">진행 중</button>
              <button className="info-button">완료</button>
            </div>
          </section>
        </main>
      </div>
    );
  }
  
  export default Issue;