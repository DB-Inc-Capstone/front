import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { WorkerContext } from './WorkerContext';
import MenuBar from "../components/MenuBar";
import "./Issue.css";

const port = 9000;
//const backend_url = `http://ec2-43-202-33-178.ap-northeast-2.compute.amazonaws.com:${port}`;
const backend_url = 'http://back-apigateway:9000';

const Issue = () => {
  const [issueList, setIssueList] = useState([]);
  const [workList, setWorkList] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null); // 선택된 작업 상태
  const [editIssue, setEditIssue] = useState({}); // 수정할 작업 정보 상태
  const [workerList, setWorkerList] = useState([]); // 작업자 목록 조회한 값
  const { workerID } = useContext(WorkerContext); // login한 사원 번호
  const [choice, setChoice] = useState("0"); // 전체 or 작업자 조회

  // 작업 내용 클릭 시 팝업 표시 및 선택된 작업 업데이트
  const handleIssueClick = (issue) => {
    setSelectedIssue(issue);
    setEditIssue({ ...issue }); // 선택된 작업 정보를 수정할 작업 정보로 설정
  };

  // 팝업에서 내용 수정 후 저장 시 작업 내용 업데이트
  const handleSaveEdit = async () => {
    try {
      // 수정된 내용을 서버에 반영
      await axios.put(`${backend_url}/work/issue/${selectedIssue.issueID}`, editIssue);
      // 수정된 내용을 선택된 작업에 반영
      setSelectedIssue({ ...selectedIssue, ...editIssue });
      fetchData(); // 작업 추가 후 작업 목록을 다시 불러옵니다.
    } catch (error) {
      console.error("Error updating issue content:", error);
    } finally {
      // 팝업 닫기
      setSelectedIssue(null);
      // 수정 작업 초기화
      setEditIssue({});
    }
  };

  const handleDeleteIssue = async () => {
    try {
      await axios.delete(`${backend_url}/work/${selectedIssue.workID}/issue/${selectedIssue.issueID}`);
      fetchData(); // 작업 삭제 후 작업 목록을 다시 불러옵니다.
    } catch (error) {
      console.error("Error deleting issue:", error);
    } finally {
      // 팝업 닫기
      setSelectedIssue(null);
    }
  };

  const fetchData = async () => {
    try {
      const workResponse = await axios.get(`${backend_url}/work`);
      const issueResponse = await axios.get(`${backend_url}/work/issue`);
      const workerresponse = await axios.get(`${backend_url}/worker`);
      const workList = workResponse.data.workinfos;
      const issueList = issueResponse.data.issueinfos;
      const workerList = workerresponse.data.workers;
      const workIDList = workList.filter(work => work.workerID === workerID).map(work => work.workID);
      const filteredissueList = (choice === "0" ? issueList : issueList.filter(issue => issue.workerID === workerID));

      setWorkList(workList);
      setIssueList(filteredissueList);
      setWorkerList(workerList);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [showAddTodo, setShowAddTodo] = useState(false); // 작업 추가창 표시 여부를 관리하는 상태

  const onSubmitHandler = async (e) => {
    e.preventDefault(); // 폼 기본 제출 동작 방지

    const issueTitle = e.target.issueTitle.value;
    const workID = e.target.workID.value;
    const issueContent = e.target.issueContent.value;
    const issueState = e.target.issueState.value;
    const targetID = e.target.workerID.value;

    await axios.post(`${backend_url}:${port}/work/issue`, { 
      issueTitle, 
      workID, 
      issueContent, 
      issueState,
      workerID: targetID
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

  const getWorkTitle = (workID) => {
    const work = workList.find(work => work.workID === workID);
    return work ? work.workTitle : "Unknown Work";
  };

  const handleChoiceChange = (e) => {
    setChoice(e.target.value);
    fetchData();
  };

  return (
    <div className="container">
      <MenuBar />
      <div className="filter-choice">
          <select value={choice} onChange={handleChoiceChange}>
              <option value="0">전체 이슈 조회</option>
              <option value="1">내 이슈 조회</option>
          </select>
      </div>
      <div className="issuelist" style={{ maxHeight: "800px", overflowY: "auto" }}>
        <table>
          <thead>
            <tr>
              <th className="issue"># Issue</th>
              <th className="work"># Work</th>
              <th className="worker">😀 worker</th>
              <th className="summary">📖 Summary</th>
              <th className="status">+ Status</th>
            </tr>
          </thead>
          <tbody>
            {issueList?.map((issue) => (
              <tr key={issue.issueID} onClick={() => handleIssueClick(issue)}>
                <td>{issue.issueTitle}</td>
                <td>{getWorkTitle(issue.workID)}</td>
                <td>
                    {workerList.find(worker => worker.id === issue.workerID)?.nickname || 'Unknown'}
                </td>
                <td>{issue.issueContent}</td>
                <td>{issue.issueState === 0 ? "할 일" : (issue.issueState === 1 ? "진행 중" : "완료")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 작업 추가 버튼 */}
      <div className="add-button-issue">
          <button onClick={handleAddTodoClick}>+</button>
      </div>

      {/* 이슈 추가 팝업 */}
      {showAddTodo && (
          <div className="add-todo" style={{ maxHeight: "1200px", overflowY: "auto" }}>
              <form onSubmit={onSubmitHandler}>
                  <div className="form-group">
                      <label htmlFor="issueTitle">이슈 제목</label>
                      <input required type="text" name="issueTitle" />
                  </div>
                  <div className="form-group">
                      <label htmlFor="issueState">이슈 상태</label>
                      <select required name="issueState">
                          <option value="0">할 일</option>
                          <option value="1">진행 중</option>
                          <option value="2">완료</option>
                      </select>
                  </div>
                  <div className="form-group">
                      <label htmlFor="workTitle">관련 작업</label>
                      <select
                        id="workTitle"
                        name="workID"
                        required
                      >
                        <option value="">작업 제목 선택</option>
                        {workList.map((work) => (
                          <option key={work.workID} value={work.workID}>
                            {work.workTitle}
                          </option>
                        ))}
                      </select>
                  </div>
                  <div className="form-group">
                      <label htmlFor="workerID">작업자</label>
                      <select id="workerID" name="workerID" required>
                      <option value="">작업자 선택</option>
                      {workerList.map((worker) => (
                          <option key={worker.id} value={worker.id}>
                              {worker.nickname}
                          </option>
                      ))}
                      </select>
                  </div>
                  <div className="form-group">
                      <label htmlFor="issueContent">이슈 내용</label>
                      <textarea required cols="50" rows="10" id="issueContent" name="issueContent"></textarea>
                  </div>

                  <button type="submit" className="form-submit-button">이슈 추가</button>
                  {/* 팝업 닫기 버튼 */}
              <button type="button" className="form-submit-button" onClick={handleCloseModal}>창 닫기</button>
              </form>
          </div>
        )}

      {/* 이슈 내용 수정 팝업 */}
      {selectedIssue && (
        <div className="popup-content">
            <h2>Issue Content</h2>
            <div className="add-todo" style={{ maxHeight: "1200px", overflowY: "auto" }}>
                <form>
                    <div className="form-group">
                        <label htmlFor="issueTitle">이슈 제목</label>
                        <input type="text" id="issueTitle" name="issueTitle" value={editIssue.issueTitle || ""} onChange={(e) => setEditIssue({ ...editIssue, issueTitle: e.target.value })} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="issueState">이슈 상태</label>
                        <select id="issueState" name="issueState" value={editIssue.issueState || ""} onChange={(e) => setEditIssue({ ...editIssue, issueState: e.target.value })}>
                          <option value="0">할 일</option>
                          <option value="1">진행 중</option>
                          <option value="2">완료</option>
                        </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="workTitle">관련 작업</label>
                      <select
                        id="workTitle"
                        name="workID"
                        value={editIssue.workID || ""}
                        onChange={(e) => {
                          const selectedWork = workList.find(work => work.workID === e.target.value);
                          setEditIssue({ ...editIssue, workID: e.target.value, workTitle: selectedWork?.workTitle });
                        }}
                        required
                      >
                        <option value="">작업 제목 선택</option>
                        {workList.map((work) => (
                          <option key={work.workID} value={work.workID}>
                            {work.workTitle}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="workerID">작업자</label>
                        <select id="workerID" name="workerID" required value={editIssue.workerID} onChange={(e) => setEditIssue({ ...editIssue, workerID: parseInt(e.target.value) })}>
                        <option value="">작업자 선택</option>
                        {workerList.map((worker) => (
                            <option key={worker.id} value={worker.id}>
                                {worker.nickname}
                            </option>
                        ))}
                    </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="issueContent">이슈 내용</label>
                        <textarea id="issueContent" name="issueContent" value={editIssue.issueContent || ""} onChange={(e) => setEditIssue({ ...editIssue, issueContent: e.target.value })}></textarea>
                    </div>
                    {/* 수정 내용 저장 버튼 */}
                    <button type="button" className="form-submit-button" onClick={handleSaveEdit}>Save</button>
                    {/* 팝업 닫기 버튼 */}
                    <button type="button" className="form-submit-button" onClick={() => setSelectedIssue(null)}>Close</button>
                    {/* 이슈 삭제 버튼 */}
                    <button type="button" className="form-submit-button-delete" onClick={handleDeleteIssue}>Delete</button>
                </form>
            </div>
        </div>
      )}
    </div>
  );
};

export default Issue;
