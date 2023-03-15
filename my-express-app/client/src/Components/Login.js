import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const login = async () => {
    try {
      let options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      };
      const result = await fetch("/users/login", options);
      const data = await result.json();
      if (!result.ok) setError(data.error);
      else {
        //store token locally
        localStorage.setItem("token", data.token);
        //redirect to private page
        navigate("/private");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="m-auto">
        {/* Not sure how to center input fields */}
        <input
          value={credentials.username}
          onChange={handleChange}
          name="username"
          type="text"
          className="form-control mb-2 w-50"
        />
        <input
          value={credentials.password}
          onChange={handleChange}
          name="password"
          type="password"
          className="form-control mb-2 w-50"
        />
        <button className="btn btn-primary" onClick={login}>
          Log in
        </button>
      </div>
      {error}
    </div>
  );
}
