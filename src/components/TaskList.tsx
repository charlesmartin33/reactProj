import { useState } from "react";
import axios from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const TaskList = ({ tasks }) => {
  const [filterValue, setFilterValue] = useState("all");
  const [filterValueAll, setFilterValueToAll] = useState(true);
  const [taskCompleteCheckbox, setTaskCompleteCheckbox] = useState(Boolean);
  const handleDropDownChange = (event) => {
    setFilterValueToAll(false);
    if (event.target.value == "true") {
      setTaskCompleteCheckbox(true);
      setFilterValue("true");
    }
    if (event.target.value == "false") {
      setTaskCompleteCheckbox(false);
      setFilterValue("false");
    }
    if (event.target.value == "all") {
      setFilterValueToAll(true);
      setFilterValue("all");
    }
    console.log(event.target.value);
  };

  const [taskDescription, SetTaskDescription] = useState("");
  const token =
    "Bearer " + localStorage.getItem("user-info")?.replace(/['"]+/g, "");
  const config = {
    headers: {
      Authorization: token,
    },
  };

  //update task completed function
  const checkHandler = async (val, id) => {
    try {
      const isChecked = val.target.checked;
      await axios.put(
        "https://task-test.azurewebsites.net/task/" + id,
        { isComplete: isChecked },
        config
      );
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //update task description function
  // const updateTaskDescription = async (val, id) => {
  //   const description = val.target.checked;
  //   await axios.put(
  //     "https://task-test.azurewebsites.net/task/" + id,
  //     { title: taskDescription },
  //     config
  //   );
  //   window.location.reload();
  // };

  //delete task function
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        "https://task-test.azurewebsites.net/task/" + id,
        config
      );
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  //add task function
  const addTask = async () => {
    try {
      console.log(taskDescription);
      await axios.post(
        "https://task-test.azurewebsites.net/task/",
        { title: taskDescription, isComplete: false },
        config
      );
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" d-flex justify-content-center align-items-center w-100 vh-100 bg-primary">
      <div className="container">
        <div className="row">
          <form onSubmit={(e) => e.preventDefault()} className="p-0 m-0">
            <div className="container">
              <div className="row">
                <div className="col-lg-10 p-0">
                  <input
                    value={taskDescription}
                    className="form-control"
                    onChange={(e) => SetTaskDescription(e.target.value)}
                    type="text"
                    placeholder="Add Task"
                    name="user"
                    required
                  ></input>
                </div>
                <div className="col-lg-2">
                  <button
                    className="btn btn-dark "
                    onClick={() => addTask()}
                    type="submit"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div className="row">
          <div className="col-lg-6">
            <span className="h3">Filter: </span>
            <label>
              <select
                className="form-select"
                value={filterValue}
                onChange={handleDropDownChange}
              >
                <option value="all">All</option>

                <option value="true">Completed</option>

                <option value="false">Pending</option>
              </select>
            </label>
          </div>
        </div>
        <br />
        <div className="row">
          <ul className="list-group">
            {tasks
              .filter(
                (tt) =>
                  tt.isComplete == taskCompleteCheckbox ||
                  filterValueAll == true
              )
              .map((task) => (
                <li
                  key={task._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-10">{task.title}</div>
                      <div className="col-lg-1">
                        <input
                          type="checkbox"
                          onChange={(e) => checkHandler(e, task._id)}
                          defaultChecked={task.isComplete}
                        />
                      </div>
                      <div className="col-lg-1">
                        <span
                          title="Delete"
                          onClick={() => deleteTask(task._id)}
                        >
                          <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
                        </span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
