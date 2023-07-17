import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "../api/axios";
const LOGIN_URL = "https://task-test.azurewebsites.net/login";

export const Login = () => {
  const [username, setUser] = useState("");
  const [password, setPwd] = useState("");
  const [tryAgain, setTryAgain] = useState(false);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      console.log(username);
      console.log(password);
      const response = await axios.post(LOGIN_URL, {
        username: username,
        password: password,
      });
      console.log(username);
      localStorage.setItem("user-info", JSON.stringify(response?.data));
      <Navigate to="/tasks" />;
      window.location.reload();
      setUser("");
      setPwd("");
    } catch (error: any) {
      if (401 === error.response.status) {
        setTryAgain(true);
      }
      console.log(error);
    }
  };
  const authenticated = localStorage.getItem("user-info");
  return (
    <>
      {!authenticated ? (
        <div className="login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary">
          <div className="40-w p-5 rounded bg-white">
            <form onSubmit={handleSubmit}>
              <h1 className="h3 mb-3 fw-normal">Please Sign In</h1>
              <div className="mb-2">
                <label htmlFor="user">Username:</label>
                <input
                  value={username}
                  className="form-control"
                  onChange={(e) => setUser(e.target.value)}
                  type="text"
                  placeholder="Username"
                  name="user"
                  required
                ></input>
              </div>
              <div className="mb-2">
                <label htmlFor="Password">Password:</label>
                <input
                  value={password}
                  className="form-control"
                  onChange={(e) => setPwd(e.target.value)}
                  type="password"
                  placeholder="*****"
                  name="Password"
                  required
                ></input>
              </div>

              <div className="d-grid">
                <button className="btn btn-primary ">Log In</button>
              </div>
              {tryAgain ? (
                <div className="text-danger">Please try again</div>
              ) : (
                <div></div>
              )}
            </form>
          </div>
        </div>
      ) : (
        <Navigate to="/tasks" />
      )}
    </>
  );
};
