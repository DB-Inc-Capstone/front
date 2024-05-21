import React from "react";
import MenuBar from "../components/MenuBar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
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

    const workData = {
      labels: ['Done Work', 'Remaining Work'],
      datasets: [{
          data: [doneWork, totalWork - doneWork],
          backgroundColor: ['#36A2EB', '#FF6384'],
          hoverBackgroundColor: ['#36A2EB', '#FF6384']
      }]
  };

  const issueData = {
      labels: ['Done Issue', 'Remaining Issue'],
      datasets: [{
          data: [doneIssue, totalIssue - doneIssue],
          backgroundColor: ['#FFCE56', '#FF6384'],
          hoverBackgroundColor: ['#FFCE56', '#FF6384']
      }]
  };

  return (
      <div className="container">
          <MenuBar />
          <div className="chart-container">
              <h3> Work Progress
              <Doughnut data={workData} /> </h3>
              <br/>
              <h3> Issue Progress
              <Doughnut data={issueData} /> </h3>
          </div>
      </div>
  );
  }
  
  export default Dashboard;