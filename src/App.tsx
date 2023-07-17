import { useState, useEffect } from "react";
import "./App.css";
import { Login } from "./components/Login";
import Tasks from "./components/Tasks";
import NoPage from "./components/NoPage";
import Spinner from "./components/Spinner";
import { Route, Routes } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      setIsLoggedin(true);
    } else setIsLoggedin(false);
  });

  const setActiveTab = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    localStorage.removeItem("user-info");
    setIsLoggedin(false);
    console.log("logged out");
  };
  return (
    <>
      {/* <Spinner></Spinner> */}
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <FontAwesomeIcon icon={faListCheck}></FontAwesomeIcon>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/tasks">
                  <h3>Tasks</h3>
                </a>
              </li>
              {isLoggedin ? (
                <li className="nav-item">
                  <a href="#" onClick={setActiveTab} className="nav-link">
                    <h3>Logout</h3>
                  </a>
                </li>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    <h3>Login</h3>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div>
        <Routes>
          <Route path="/tasks" Component={Tasks} />
          <Route path="/login" Component={Login} />
          <Route path="/spinner" Component={Spinner} />
          <Route path="*" Component={NoPage} />
        </Routes>
      </div>
    </>
  );
}

export default App;
