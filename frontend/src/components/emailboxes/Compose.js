import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setShowCompose } from "../../Utils/ModalSlice";

const Compose = () => {
  const [editorState, setEditorState] = useState("");
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const email = useSelector((state) => state.auth.isEmail);
  const token = useSelector((state) => state.auth.isToken);
  const dispatch = useDispatch();

  const handleSend = async () => {
    const data = {
      from: email,
      to: to,
      subject: subject,
      body: editorState.getCurrentContent().getPlainText(),
    };
    try {
      const result = await axios.post(`http://localhost:3000/mail/send`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      setTo("");
      setSubject("");
      setEditorState("");
    } catch (error) {
      console.error(error);
    }
  };
  const handleClose = () => {
    dispatch(setShowCompose(false));
  };
  return (
    <div className="relative flex flex-col gap-4 w-full p-4 border border-gray-300 rounded-md shadow-lg bg-white">
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Recipient email"
          onChange={(e) => setTo(e.target.value)}
          value={to}
          className="p-2 mr-10 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          placeholder="Subject"
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
          className="p-2 mr-10 border border-gray-300 rounded-md"
        />
      </div>
      <div className="border border-gray-300 rounded-md overflow-hidden max-h-72 mr-10 min-h-72">
        <Editor
          editorState={editorState}
          toolbarClassName=""
          wrapperClassName="overflow-y-auto max-h-72 min-h-72"
          editorClassName="p-2"
          onEditorStateChange={setEditorState}
        />
      </div>
      <div className="flex mt-2">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Compose;
