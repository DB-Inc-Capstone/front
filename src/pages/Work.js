import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import MenuBar from "../components/MenuBar";
import "./Work.css";
import { WorkerContext } from "./WorkerContext";

const port = 9002;

const Work = () => {
    const navigate = useNavigate();
    const [showAddTodo, setShowAddTodo] = useState(false); // 작업 추가창 표시 여부를 관리하는 상태
    const [todoList, setTodoList] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [finishDate, setFinishDate] = useState(new Date());
    const [workerList, setWorkerList] = useState([]); // 작업자 목록 조회한 값
    const { workerID } = useContext(WorkerContext); //  // login한 사원 번호
    const [choice, setChoice] = useState("0"); // 전체 or 작업자 조회

    const fetchData = async () => {
        const response = await axios.get('http://ec2-43-203-124-16.ap-northeast-2.compute.amazonaws.com:'+port+'/work');
        const workerresponse = await axios.get('http://ec2-43-203-124-16.ap-northeast-2.compute.amazonaws.com:9001/worker');
        const fetchedTodoList = response.data.workinfos;
        const filteredTodoList = (choice === "0" ? fetchedTodoList : fetchedTodoList.filter(todo => todo.workerID === workerID));
        setTodoList(filteredTodoList);
        setWorkerList(workerresponse.data.workers);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault(); // 폼 기본 제출 동작 방지

        const workTitle = e.target.workTitle.value;
        const workContent = e.target.workContent.value;
        const workState = e.target.workState.value;
        const workerID = e.target.workerID.value;
        const startDateFormatted = moment(startDate).format('YYYY-MM-DD');
        const finishDateFormatted = moment(finishDate).format('YYYY-MM-DD');

        await axios.post('http://ec2-43-203-124-16.ap-northeast-2.compute.amazonaws.com:' + port + '/work', {
            workTitle,
            workContent,
            workState,
            //workerID, // login한 사원의 id (username)
            startDate: startDateFormatted,
            finishDate: finishDateFormatted
        });
        setShowAddTodo(false); // 작업 추가창을 닫습니다.
        fetchData(); // 작업 추가 후 작업 목록을 다시 불러옵니다.
    };

    const handleAddTodoClick = () => {
        setShowAddTodo(true); // 모달 열기
    };

    const handleCloseModal = () => {
        setShowAddTodo(false); // 모달 닫기
    };

    useEffect(() => {
        fetchData();
    }, [choice]);

    const handleChoiceChange = (e) => {
        setChoice(e.target.value);
        fetchData();
    };

    return (
        <div className="container">
            <MenuBar />
            <div className="filter-choice">
                <select value={choice} onChange={handleChoiceChange}>
                    <option value="0">전체 작업 조회</option>
                    <option value="1">내 작업 조회</option>
                </select>
            </div>
            <div className="add-button">
                <button onClick={handleAddTodoClick}>📖 할 일 +</button>
            </div>
            <div className="add-button2">
                <button>진행 중</button>
            </div>
            <div className="add-button3">
                <button>완료</button>
            </div>
            <div className="todo-list">
                <div className="form">
                    {todoList?.filter(todo => todo.workState === 0).slice(0, 4).map((todo) => (
                        <div key={todo.workID} className="todo-item">
                            <label>{todo.workTitle}</label>
                            <p>{todo.workContent}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="todo-list-1">
                <div className="form">
                    {todoList?.filter(todo => todo.workState === 1).slice(0, 4).map((todo) => (
                        <div key={todo.workID} className="todo-item">
                            <label>{todo.workTitle}</label>
                            <p>{todo.workContent}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="todo-list-2">
                <div className="form">
                    {todoList?.filter(todo => todo.workState === 2).slice(0, 4).map((todo) => (
                        <div key={todo.workID} className="todo-item">
                            <label>{todo.workTitle}</label>
                            <p>{todo.workContent}</p>
                        </div>
                    ))}
                </div>
            </div>
            {showAddTodo && (
                <div className="add-todo">
                    <form onSubmit={onSubmitHandler}>
                        <div className="form-group">
                            <label htmlFor="workTitle">작업 제목</label>
                            <input required type="text" name="workTitle" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="workState">작업 상태</label>
                            <select required name="workState">
                                <option value="0">할 일</option>
                                <option value="1">진행 중</option>
                                <option value="2">완료</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="workerID">작업자</label>
                            <select id="workerID" name="workerID" required>
                                <option value="">작업자 선택</option>
                                {workerList.map((worker) => (
                                    <option key={worker.id} value={worker.username}>
                                        {worker.username}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="startDate">시작일</label>
                            <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="finishDate">완료일</label>
                            <DatePicker
                                selected={finishDate}
                                onChange={(date) => setFinishDate(date)}
                                dateFormat="yyyy-MM-dd"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="workContent">작업 내용</label>
                            <textarea required cols="50" rows="10" id="workContent" name="workContent"></textarea>
                        </div>
                        <button type="submit" className="form-submit-button">작업 추가</button>
                        <button type="button" className="form-submit-button" onClick={handleCloseModal}>창 닫기</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Work;
