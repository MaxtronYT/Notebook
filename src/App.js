import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import Navbar from "./comps/Navbar";
import MainApp from "./comps/MainApp";
import Sign from "./comps/Sign";
import Auth from "./comps/Auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./comps/ProtectedRoute";

export default function App() {
  const [log, setlog] = useState(false);
  const [name, setname] = useState(null);
  const [pass, setpass] = useState(null);
  function setauth(login, name, pass) {
    setlog(login);
    setname(name);
    setpass(pass);
  }
  return (
    <div className='flex-col flex items-center w-full'>
      <Navbar></Navbar>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute login={log} />}>
            <Route
              path='app'
              element={
                <MainApp name={name} pass={pass} setauth={setauth} />
              }></Route>
          </Route>

          <Route index path='/' element={<Auth setauth={setauth}></Auth>} />
          {/* <Route path='app' element={<MainApp />}></Route> */}
          <Route path='sign' element={<Sign />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
