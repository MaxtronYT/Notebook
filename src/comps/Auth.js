import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Auth(props) {
  var history = useNavigate();
  var name = React.createRef(null);
  var pass = React.createRef(null);
  var [mes, setmes] = useState("String");

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          axios
            .post("http://localhost:6001/login", {
              name: name.current.value,
              pass: pass.current.value,
            })
            .then((r) => {
              setmes(r.data);
              if (mes === "Login successful") {
                history("/app");
                props.setauth(true, name.current.value, pass.current.value);
              }
            });
        }}>
        Name
        <input ref={name} type='text' />
        <br />
        Password
        <input ref={pass} type='password' name='' id='' />
        <br />
        <input type='submit' name='Login' value='Submit' />
      </form>
      {/* {mes == "Login successful" :{ props.setauth() }  */}
      <h1>{mes !== "String" && mes}</h1>
      <a href='/sign'>Click here to create account.</a>
    </div>
  );
}
