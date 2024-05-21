import React from "react";
import MenuBar from "../components/MenuBar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import axios from "axios";
import 'chart.js/auto';
import './Dashboard.css'

function Dashboard() {
    const [totalWork , setTotalWork] = useState(100);
    const [haveToDoWork, setHaveToDoWork] = useState(40);
    const [continuingWork, setContinuingWork] = useState(30);
    const [doneWork, setDoneWork] = useState(30);
    const [totalIssue , setTotalIssue] = useState(100);
    const [haveToDoIssue, setHaveToDoIssue] = useState(20);
    const [continuingIssue, setContinuingIssue] = useState(40);
    const [doneIssue, setDoneIssue] = useState(40);

    const total_done_workData = {
        labels: ['Done Work', 'Remaining Work'],
        datasets: [{
            data: [doneWork, totalWork - doneWork],
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384']
        }]
    };

    const have_cont_workData = {
      labels: ['Have Work', 'Continuing Work'],
        datasets: [{
            data: [haveToDoWork, continuingWork],
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384']
        }]
    }

    const total_done_issueData = {
        labels: ['Done Issue', 'Remaining Issue'],
        datasets: [{
            data: [doneIssue, totalIssue - doneIssue],
            backgroundColor: ['#FFCE56', '#FF6384'],
            hoverBackgroundColor: ['#FFCE56', '#FF6384']
        }]
    };

    const have_cont_issueData = {
      labels: ['Have Issue', 'Continuing Issue'],
        datasets: [{
            data: [haveToDoIssue, continuingIssue],
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384']
        }]
    }

    return (
        <div className="container">
            <MenuBar />
            <div className="dashboard-container">
                <div className="chart-container">
                    <h3> Total-Done Work Ratio </h3>
                    <Doughnut data={total_done_workData} />
                </div>
                <div className="chart-container">
                    <h3> Have-Cont Work Ratio </h3>
                    <Doughnut data={have_cont_workData} />
                </div>
            </div>
            <div className="dashboard-container">
                <div className="chart-container">
                    <h3> Total-Done Issue Ratio </h3>
                    <Doughnut data={total_done_issueData} />
                </div>
                <div className="chart-container">
                    <h3> Have-Cont Issue Ratio </h3>
                    <Doughnut data={have_cont_issueData} />
                </div>
            </div>
        </div>
    );
}
  
export default Dashboard;