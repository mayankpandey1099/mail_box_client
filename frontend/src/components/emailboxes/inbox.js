import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

import { setReadCount } from "../../Utils/MailSlice";

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const token = useSelector((state) => state.auth.isToken);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/mail/inbox`, {
        headers: {
          Authorization: token,
        },
      });
      const data = response.data;
      const unReadCount = data.unreadCount;
      const emails = data.emails;
      console.log(emails);

      dispatch(setReadCount(unReadCount));
      setEmails(emails);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEmailClick = async (email) => {
    setSelectedEmail(email);
    try{
      const emailId = email.id;
      const result = await axios.patch(
        `http://localhost:3000/mail/updateInbox/${emailId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch(err){
      console.error("error updating the email", err);
    }
  };

  const handleClose = () => {
    setSelectedEmail(null);
  };

  const handleDelete = async (emailId) => {
    try {
      await axios.delete(`http://localhost:3000/mail/inbox/${emailId}`, {
        headers: {
          Authorization: token,
        },
      });
      fetchData();
      handleClose();
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  useEffect(() => {
    // Initial fetch
    //fetchData();
    const intervalId = setInterval(fetchData, 2000);
    return () => clearInterval(intervalId);
  }, []);


  if (selectedEmail) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-4 m-4 flex-1 max-w-6xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="pl-4 text-xl font-bold">{selectedEmail.subject}</h2>
            <button onClick={handleClose} className="text-red-500">
              Close
            </button>
          </div>
          <div className="mb-4 border p-4 rounded shadow">
            <strong>From:</strong> {selectedEmail.senderEmail}
          </div>
          <div className="mb-4 border p-4 rounded shadow min-h-96 overflow-y-auto">
            <p>{selectedEmail.body}</p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => handleDelete(selectedEmail.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ul>
      {emails.map((email, index) => (
        <li
          key={index}
          className={`m-1 p-2 shadow-md rounded-md flex items-center justify-between cursor-pointer ${
            email.isRead ? "bg-gray-100" : "bg-gray-300"
          }`}
          onClick={() => handleEmailClick(email)}
        >
          <div className="flex items-center">
            <div className="font-bold text-lg pr-8">{email.senderEmail}</div>
            <div className="font-bold pr-8">
              {email.subject.length > 45
                ? email.subject.substring(0, 45) + "..."
                : email.subject}
              </div>
            <div className="text-sm">
              {email.body.length > 50
                ? email.body.substring(0, 100) + "..."
                : email.body}
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(email.createdAt), {
              addSuffix: true,
            })}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Inbox;
