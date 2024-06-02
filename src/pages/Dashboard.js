import React, { useContext, useState, useEffect } from "react";
import MenuBar from "../components/MenuBar";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import 'chart.js/auto';
import './Dashboard.css';
import { WorkerContext } from './WorkerContext';

const port = 9000;
const backend_url = `http://ec2-52-79-149-161.ap-northeast-2.compute.amazonaws.com:${port}`;

function Dashboard() {
    const [totalWork , setTotalWork] = useState(0);
    const [totalDoneWork, setTotalDoneWork] = useState(0);
    const [totalIssue , setTotalIssue] = useState(0);
    const [totalDoneIssue, setTotalDoneIssue] = useState(0);
    const [myTotalWork , setMyTotalWork] = useState(0);
    const [myTotalDoneWork, setMyTotalDoneWork] = useState(0);
    const [myTotalIssue , setMyTotalIssue] = useState(0);
    const [myTotalDoneIssue, setMyTotalDoneIssue] = useState(0);
    const { workerID } = useContext(WorkerContext); //  login한 사원의 ID

    const fetchData = async () => {
        try {
            const workResponse = await axios.get(`${backend_url}/dashboard/totalwork`);
            setTotalWork(workResponse.data.totalWork);
            setTotalDoneWork(workResponse.data.doneWork);
            
            const myWorkResponse = await axios.get(`${backend_url}/dashboard/totalwork/worker/${workerID}`);
            setMyTotalWork(myWorkResponse.data.totalWork);
            setMyTotalDoneWork(myWorkResponse.data.doneWork);
            
            const issueResponse = await axios.get(`${backend_url}/dashboard/totalissue`);
            setTotalIssue(issueResponse.data.totalIssue);
            setTotalDoneIssue(issueResponse.data.doneIssue);
            
            const myIssueResponse = await axios.get(`${backend_url}/dashboard/totalissue/worker/${workerID}`);
            setMyTotalIssue(myIssueResponse.data.totalIssue);
            setMyTotalDoneIssue(myIssueResponse.data.doneIssue);
        } catch (error) {
            console.error("Error fetching data", error);
        }
    };

    useEffect(() => {
        fetchData();
    });

    const total_done_workData = {
        labels: ['Done Work', 'Remaining Work'],
        datasets: [{
            data: [totalDoneWork, totalWork - totalDoneWork],
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384']
        }]
    };

    const total_mydone_workData = {
      labels: ['My Done Work', 'My Remaining Work'],
        datasets: [{
            data: [myTotalDoneWork, myTotalWork - myTotalDoneWork],
            backgroundColor: ['#36A2EB', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384']
        }]
    }

    const total_done_issueData = {
        labels: ['Done Issue', 'Remaining Issue'],
        datasets: [{
            data: [totalDoneIssue, totalIssue - totalDoneIssue],
            backgroundColor: ['#FFCE56', '#FF6384'],
            hoverBackgroundColor: ['#FFCE56', '#FF6384']
        }]
    };

    const total_mydone_issueData = {
      labels: ['My Done Issue', 'My Remaining Issue'],
        datasets: [{
            data: [myTotalDoneIssue, myTotalIssue - myTotalDoneIssue],
            backgroundColor: ['#FFCE56', '#FF6384'],
            hoverBackgroundColor: ['#FFCE56', '#FF6384']
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
                    <h3> My Total-Done Work Ratio </h3>
                    <Doughnut data={total_mydone_workData} />
                </div>
            </div>
            <div className="dashboard-container">
                <div className="chart-container">
                    <h3> Total-Done Issue Ratio </h3>
                    <Doughnut data={total_done_issueData} />
                </div>
                <div className="chart-container">
                    <h3> My Total-Done Issue Ratio </h3>
                    <Doughnut data={total_mydone_issueData} />
                </div>
            </div>
        </div>
    );
}
  
export default Dashboard;