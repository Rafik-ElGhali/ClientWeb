import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function LoginForm() {
  const [details, setDetails] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/api/login", {
        username: details.email,
        password: details.password,
      })
      .then((results) => {
        if (results) {
          Cookies.set("access_token", results.data.token);
        window.location.reload(false);
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-inner">
        <h2>Login</h2>
        
        {/*(error!= "") ? (<div className="error">{error}</div>) : ""*/}

        <div className="form-group">
          <label ftmlForm="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => setDetails({ ...details, email: e.target.value })}
            value={details.email}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) =>
              setDetails({ ...details, password: e.target.value })
            }
            value={details.password}
          />
        </div>
        <input type="submit" value="LOGIN" />
      </div>
    </form>
  );
}
export default LoginForm;
