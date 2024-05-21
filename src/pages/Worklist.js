import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import MenuBar from "../components/MenuBar";
import "./Worklist.css";
const port = 9002;

const Worklist = () => {
  const navigate = useNavigate();

  const [todoList, setTodoList] = useState([]);
  const [selectedWork, setSelectedWork] = useState(null); // 선택된 작업 상태
  const [editWork, setEditWork] = useState({}); // 수정할 작업 정보 상태

  // 작업 내용 클릭 시 팝업 표시 및 선택된 작업 업데이트
  const handleWorkClick = (work) => {
    setSelectedWork(work);
    setEditWork({ ...work }); // 선택된 작업 정보를 수정할 작업 정보로 설정
  };

  // 팝업에서 내용 수정 후 저장 시 작업 내용 업데이트
  const handleSaveEdit = async () => {
    try {
      // 수정된 내용을 서버에 반영
      await axios.put(`http://ec2-3-35-47-9.ap-northeast-2.compute.amazonaws.com:${port}/work/${selectedWork.workID}`, editWork);

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
    const response = await axios.get('http://ec2-3-35-47-9.ap-northeast-2.compute.amazonaws.com:'+port+'/work');
    /*
    if (Array.isArray(response.data)) {
        setTodoList(response.data);
    } else {
        console.error("Unexpected response data:", response.data);
        setTodoList([]); // 응답이 배열이 아닌 경우 빈 배열로 설정
    }*/
    setTodoList(response.data.workinfos);
};

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <MenuBar />

      <div className="worklist">
        <table>
          <thead>
            <tr>
              <th className="work"># Work</th>
              <th className="summary">📖 Summary</th>
              <th className="status">+ Status</th>
              <th className="start-date">⏰ Start Date</th>
            </tr>
          </thead>
          <tbody>
            {todoList?.slice(0, 13).map((todo) => (
              <tr key={todo.workID} onClick={() => handleWorkClick(todo)}>
                <td>{todo.workTitle}</td>
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
                        <label htmlFor="startDate">시작일</label>
                        <input type="text" id="startDate" name="startDate" value={editWork.startDate || ""} onChange={(e) => setEditWork({ ...editWork, startDate: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="finishDate">완료일</label>
                        <input type="text" id="finishDate" name="finishDate" value={editWork.finishDate || ""} onChange={(e) => setEditWork({ ...editWork, finishDate: e.target.value })} />
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
