import React, {useState, useEffect } from "react";

import { useSelector } from "react-redux";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import useFetchEmails from "../Hooks/useFetchEmails";
import axios from "axios";

const Sentbox = () => {
  const { fetchSentBoxData } = useFetchEmails();

  const emails = useSelector((state) => state.mail.sentEmails);
  const token = useSelector((state) => state.auth.isToken);
  const [selectedEmail, setSelectedEmail] = useState(null);
  
  
  console.log(emails);
  const handleEmailClick = async (email) => {
    setSelectedEmail(email);
    try {
      const emailId = email.id;
      const result = await axios.patch(
        `http://localhost:3000/mail/updateSentbox/${emailId}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
    } catch (err) {
      console.error("error updating the email", err);
    }
  };

  const handleClose = () => {
    setSelectedEmail(null);
  };

  const handleDelete = async (emailId) => {
    try {
      await axios.delete(`http://localhost:3000/mail/sentbox/${emailId}`, {
        headers: {
          Authorization: token,
        },
      });
      fetchSentBoxData();
      handleClose();
    } catch (error) {
      console.error("Error deleting email:", error);
    }
  };

  useEffect(() => {
    fetchSentBoxData();
  }, [selectedEmail]);

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
            email.isRead ? "bg-gray-50" : "bg-gray-300"
          }`}
          onClick={() => handleEmailClick(email)}
        >
          <div className="flex items-center">
            <div className="font-bold text-lg pr-8">{email.recipientEmail}</div>
            <div className="font-bold pr-8">{email.subject}</div>
            <div className="text-sm">
              {email.body.length > 50
                ? email.body.substring(0, 120) + "......"
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

export default Sentbox;
