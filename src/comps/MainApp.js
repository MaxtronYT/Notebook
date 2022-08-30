import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Note from "./Note";

function MainApp(props) {
  var note = useRef(null);
  var history = useNavigate();
  var title = useRef(null);
  var [allnotes, setallnotes] = useState(null);
  function update(ti, no, ad, id) {
    axios
      .post("http://localhost:6001/update", {
        oldtitle: ti,
        oldnote: no,
        oldadded: ad,
        newtitle: title.current.value,
        newnote: note.current.value,
      })
      .then((rs) => {
        var index = allnotes.indexOf({
          title: ti,
          note: no,
          added: ad,
          id: id,
        });
        console.log(index);
      });
  }
  useEffect(() => {
    axios
      .post("http://localhost:6001/getnotes", { noe: props.name })
      .catch((err) => {
        alert("Server is Down");
      })
      .then((rs) => {
        if (rs.data) {
          setallnotes(rs.data);
        }
      });
  }, [allnotes, props.name]);
  return (
    <div className='items-center flex-col flex'>
      <div className='w-screen h-20'></div>
      <div className='flex items-center w-full px-[30rem] justify-between'>
        <span className='text-xl'>Logged in as : {props.name}</span>
        <button
          className='px-4 hover:text-purple-400 hover:bg-white ease-in transition duration-200 py-1 border border-purple-400'
          onClick={() => {
            props.setauth(false);
            history("/");
          }}>
          Logout
        </button>
      </div>
      <form
        className='top-[40rem] pt-[4rem] items-center'
        onSubmit={(e) => {
          e.preventDefault();
          axios
            .post("http://localhost:6001/insert", {
              title: title.current.value,
              note: note.current.value,
              acc: props.name,
            })
            .then((r) => setallnotes([...allnotes, r.data]));
        }}>
        <span className='px-4'>Title</span>
        <input type='text' ref={title} />
        <br />
        <span className='px-4'>Note</span>
        <input type='text' ref={note} className='w-[600px]' />
        <br />
        <button
          type='submit'
          className='px-4 border-2 border-purple-500 mx-4 my-5 rounded-lg py-2'
          value='Submit'>
          Submit
        </button>
      </form>
      <span className='text-3xl'>Your Notes</span>
      <div className='grid mt-6 grid-cols-3 grid-auto-flow-row gap-4 justify-items-center'>
        {allnotes !== null &&
          allnotes.map((e) => {
            return (
              <div className='px-6 py-4 w-[400px] h-[200px] rounded-lg border border-white '>
                <Note
                  title={e.title}
                  key={e.id}
                  func={update}
                  note={e.note}
                  id={e.id}
                  added={e.added}></Note>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default MainApp;
