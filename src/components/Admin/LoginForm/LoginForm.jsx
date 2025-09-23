import { useState, useEffect } from "react";
import { Login } from "../Login/Login";
import { Dashboard } from "../Dashboard/Dashboard";
import "./loginForm.css"

export function LoginForm() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authValue = JSON.parse(localStorage.getItem("is_authenticated"));
    setIsAuthenticated(authValue);
  }, []);

  return (
    <div className="login-form-wrapper">
      <div >
        {isAuthenticated ? (
          <Dashboard  setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <Login className="login-form-container" setIsAuthenticated={setIsAuthenticated} />
        )}
      </div>
    </div>
  );
}