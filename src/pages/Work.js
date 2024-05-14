import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

import MenuBar from "../components/MenuBar";
import './Work.css'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Work = () => {
    const navigate = useNavigate();

    const [showAddTodo, setShowAddTodo] = useState(false); // 작업 추가창 표시 여부를 관리하는 상태

    const [todoList, setTodoList] = useState(null);

    const [startDate, setStartDate] = useState(new Date());
    const [finishDate, setFinishDate] = useState(new Date());

    const location = useLocation();
    const { id } = location.state || {}; // 내가 login한 사원번호

    const fetchData = async () => {
        const response = await axios.get('http://localhost:8080/work');
        setTodoList(response.data);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault(); // 폼 기본 제출 동작 방지
    
        const workTitle = e.target.workTitle.value;
        const workContent = e.target.workContent.value;
        const workState = e.target.workState.value;

        const startDate = e.target.startDate.value;
        const finishDate = e.target.finishDate.value;
    
        await axios.post('http://localhost:8080/work/create', { workTitle, workContent, workState, startDate, finishDate });
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
    }, []);




    return (
        <div className="container">
            <MenuBar />
            <div className="add-button">
                <button onClick={handleAddTodoClick}>📖 할일 +</button>
            </div>
            <div className="add-button2">
                <button>진행 중</button>
            </div>
            <div className="add-button3">
                <button>완료</button>
            </div>
            <div className="todo-list">
                <div className="form">
                    {todoList?.slice(0, 4).map((todo) => (
                        <div key={todo.workID} className="todo-item">
                            <label>{todo.workTitle}</label>
                            <p>{todo.workContent}</p>
                            {/* <p>{todo.workState}</p>
                            <p>{todo.startDate}</p>
                            <p>{todo.finishDate}</p> */}
                        </div>
                ))}
                </div>
            </div>
            <div className="todo-list-1">
                <div className="form">
                    {todoList?.filter(todo => todo.workState === "1").slice(0, 4).map((todo) => (
                        <div key={todo.workID} className="todo-item">
                            <label>{todo.workTitle}</label>
                            <p>{todo.workContent}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="todo-list-2">
                <div className="form">
                    {todoList?.filter(todo => todo.workState === "0").slice(0, 4).map((todo) => (
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
                            <label for = "workTitle">작업 제목</label>
                            <input required type="text" name="workTitle" />
                        </div>
                        <div className="form-group">
                            <label for = "workState">작업 상태</label>
                            <select required name="workState">
                                <option value="1">진행 중</option>
                                <option value="0">완료</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label for = "startDate">시작일</label>
                            <input required type="text" name="startDate" />
                        </div>
                        <div className="form-group">
                            <label for = "finishDate">완료일</label>
                            <input required type="text" name="finishDate" />
                        </div>


                        {/* <div className="form-group">
                            <label for="startDate">시작일</label>
                            <DatePicker
                                selected={startDate} // startDate는 state로 선언되어야 합니다.
                                onChange={date => setStartDate(date)} // startDate 상태를 업데이트합니다.
                            />
                        </div>
                        <div className="form-group">
                            <label for="finishDate">완료일</label>
                            <DatePicker
                                selected={finishDate} // finishDate는 state로 선언되어야 합니다.
                                onChange={date => setFinishDate(date)} // finishDate 상태를 업데이트합니다.
                            />
                        </div> */}


                        <div className="form-group">
                            <label for = "workContent">작업 내용</label>
                            <textarea required="" cols="50" rows="10" id="workContent" name="workContent">          </textarea>
                        </div>

                        <button type="submit" className="form-submit-button">작업 추가</button>
                        {/* 팝업 닫기 버튼 */}
                    <button type="button" className="form-submit-button" onClick={() => setShowAddTodo(false)}>창 닫기</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Work;