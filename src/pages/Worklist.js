import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import MenuBar from "../components/MenuBar";
import "./Worklist.css";

import { WorkerContext } from './WorkerContext';

const port = 9002;

const Worklist = () => {
  const navigate = useNavigate();

  const [todoList, setTodoList] = useState([]);
  const [selectedWork, setSelectedWork] = useState(null); // 선택된 작업 상태
  const [editWork, setEditWork] = useState({}); // 수정할 작업 정보 상태
  const [workerList, setWorkerList] = useState([]); // 작업자 목록 조회한 값
  const [choice, setChoice] = useState("0"); // 전체 or 작업자 조회
  const { workerID } = useContext(WorkerContext); //  // login한 사원 번호

  // 작업 내용 클릭 시 팝업 표시 및 선택된 작업 업데이트
  const handleWorkClick = (work) => {
    setSelectedWork(work);
    setEditWork({ ...work }); // 선택된 작업 정보를 수정할 작업 정보로 설정
  };

  // 팝업에서 내용 수정 후 저장 시 작업 내용 업데이트
  const handleSaveEdit = async () => {
    try {
      // 수정된 내용을 서버에 반영
      await axios.put(`http://ec2-43-203-124-16.ap-northeast-2.compute.amazonaws.com:${port}/work/${selectedWork.workID}`, editWork);

      // 수정된 내용을 선택된 작업에 반영
      setSelectedWork({ ...selectedWork, ...editWork });
      fetchData(); // 작업 추가 후 작업 목록을 다시 불러옵니다.
    } catch (error) {
      console.error("Error updating work content:", error);
    } finally {
      // 팝업 닫기
      setSelectedWork(null);
      // 수정 작업 초기화
      setEditWork({});
    }
  };

  const fetchData = async () => {
    const response = await axios.get('http://ec2-43-203-124-16.ap-northeast-2.compute.amazonaws.com:'+port+'/work');
    const workerresponse = await axios.get('http://ec2-43-203-124-16.ap-northeast-2.compute.amazonaws.com:9001/worker');
    const fetchedTodoList = response.data.workinfos;
    const filteredTodoList = (choice === "0" ? fetchedTodoList : fetchedTodoList.filter(todo => todo.workerID === workerID));
    setTodoList(filteredTodoList);
    setWorkerList(workerresponse.data.workers);
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
      <div className="worklist">
        <table>
          <thead>
            <tr>
              <th className="work"># Work</th>
              <th className="worker">😀 worker</th>
              <th className="summary">📖 Summary</th>
              <th className="status">+ Status</th>
              <th className="start-date">⏰ Start Date</th>
            </tr>
          </thead>
          <tbody>
            {todoList?.slice(0, 13).map((todo) => (
              <tr key={todo.workID} onClick={() => handleWorkClick(todo)}>
                <td>{todo.workTitle}</td>
                <td>{todo.workerID}</td>
                <td>{todo.workContent}</td>
                <td>{todo.workState === 0 ? "할 일" : (todo.workState === 1 ? "진행 중" : "완료")}</td>
                <td>{todo.startDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 작업 내용 수정 팝업 */}
      {selectedWork && (
        <div className="popup-content">
            <h2>Work Content</h2>
            <div className="add-todo">
                <form>
                    <div className="form-group">
                        <label htmlFor="workTitle">작업 제목</label>
                        <input type="text" id="workTitle" name="workTitle" value={editWork.workTitle || ""} onChange={(e) => setEditWork({ ...editWork, workTitle: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="workState">작업 상태</label>
                        <select id="workState" name="workState" value={editWork.workState || ""} onChange={(e) => setEditWork({ ...editWork, workState: e.target.value })}>
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
                            selected={moment(editWork.startDate).toDate()} // Moment.js 객체를 JavaScript Date 객체로 변환
                            onChange={(date) => setEditWork({ ...editWork, startDate: moment(date).format("YYYY-MM-DD") })} // 선택된 날짜를 ISO 형식으로 변환하여 상태에 설정
                            dateFormat="yyyy-MM-dd" // 날짜 형식 설정
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="finishDate">완료일</label>
                        <DatePicker
                            selected={moment(editWork.finishDate).toDate()} // Moment.js 객체를 JavaScript Date 객체로 변환
                            onChange={(date) => setEditWork({ ...editWork, finishDate: moment(date).format("YYYY-MM-DD") })} // 선택된 날짜를 ISO 형식으로 변환하여 상태에 설정
                            dateFormat="yyyy-MM-dd" // 날짜 형식 설정
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="workContent">작업 내용</label>
                        <textarea id="workContent" name="workContent" value={editWork.workContent || ""} onChange={(e) => setEditWork({ ...editWork, workContent: e.target.value })}></textarea>
                    </div>
                    {/* 수정 내용 저장 버튼 */}
                    <button type="button" className="form-submit-button" onClick={handleSaveEdit}>Save</button>
                    {/* 팝업 닫기 버튼 */}
                    <button type="button" className="form-submit-button" onClick={() => setSelectedWork(null)}>Close</button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default Worklist;
