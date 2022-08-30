import React, { Component } from "react";
import axios from "axios";

export default class Sign extends Component {
  constructor(props) {
    super(props);
    this.name = React.createRef(null);
    this.pass = React.createRef(null);
  }

  render() {
    return (
      <div>
        <h1>Sign</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            axios
              .post("http://localhost:6001/sign", {
                name: this.name.current.value,
                pass: this.pass.current.value,
              })
              .then((r) => {
                alert(r.data);
              });
          }}>
          Name
          <input ref={this.name} type='text' />
          <br />
          Password
          <input ref={this.pass} type='password' name='' id='' />
          <br />
          <input type='submit' name='Login' value='Submit' />
        </form>
        <a href='/'>Login here.</a>
      </div>
    );
  }
}
