 import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import MenuBar from "../components/MenuBar";
import './Work.css'

const Work = () => {
    const navigate = useNavigate();

    const [todoList, setTodoList] = useState(null);

    const fetchData = async () => {
        const response = await axios.get('http://localhost:8080/work/:workID');
        setTodoList(response.data);


        // fetch('http://localhost:8080/work/todo')
        // .then((response) => response.json())
        // .then((data) => setTodoList(data));
    };

    const onSubmitHandler = async (e) => {
        const workTitle = e.target.workTitle.value;
        const workContent = e.target.workContent.value;
        const workState = e.target.workState.value;
        const startDate = e.target.startDate.value;
        const finishDate = e.target.finishDate.value;

        await axios.post('http://localhost:8080/work/create', { workTitle, workContent, workState, startDate, finishDate });
        fetchData();


        // fetch('http://localhost:8080/work/todo', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         workTitle,
        //         workContent,
        //         workState,
        //         startDate,
        //         finishDate,
        //     }),
        // }).then(() => fetchData());
    };

    useEffect(() => {
        fetchData();
    }, []);




    return (
        <div className="container">
            <MenuBar />
            <div className="add-todo">
                <h1>작업 추가</h1>
                <form onSubmit={onSubmitHandler}>
                    <label>
                        작업 제목
                        <input type="text" name="workTitle" />
                    </label>
                    <label>
                        작업 내용
                        <input type="text" name="workContent" />
                    </label>
                    <label>
                        작업 상태
                        <input type="text" name="workState" />
                    </label>
                    <label>
                        시작일
                        <input type="text" name="startDate" />
                    </label>
                    <label>
                        완료일
                        <input type="text" name="finishDate" />
                    </label>
                    <button type="submit">작업 추가</button>
                </form>
            </div>
            <div className="todo-list">
                <h1>작업리스트</h1>
                {todoList?.map((todo) => (
                    <div key={todo.workID}>
                        <p>{todo.workTitle}</p>
                        <p>{todo.workContent}</p>
                        <p>{todo.workState}</p>
                        <p>{todo.startDate}</p>
                        <p>{todo.finishDate}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Work;