import { Navigate } from "react-router-dom";
import axios from "../api/axios";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";
import TaskList from "./TaskList";

const Tasks = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const authenticated = localStorage.getItem("user-info");
  const api = "https://task-test.azurewebsites.net/task/list";
  const token =
    "Bearer " + localStorage.getItem("user-info")?.replace(/['"]+/g, "");

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(api, {
        headers: {
          Authorization: token,
        },
      });
      const tasks = data;
      setTasks(tasks);
      // console.table(tasks);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [tasks]);

  return (
    <div>
      {authenticated ? (
        <>
          {tasks ? (
            <>
              <TaskList tasks={tasks} />
            </>
          ) : (
            <Spinner />
          )}
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default Tasks;
