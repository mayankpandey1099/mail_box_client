import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Inbox from "../EmailBoxes/Inbox";
import Sentbox from "../EmailBoxes/Sentbox";
import Compose from "../EmailBoxes/Compose";
import { setShowCompose } from "../../Utils/ModalSlice";
import { clearAuthState } from "../../Utils/AuthSlice";

const Home = () => {
  const [activeTab, setActiveTab] = useState("Inbox");
  const unReadCount = useSelector((state) => state.mail.unReadCount);
  const showCompose = useSelector((state) => state.modal.showCompose);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    if (tab === "Logout") {
      dispatch(clearAuthState());
      navigate("/");
    }
    setActiveTab(tab);
  };

  const handleComposeTab = () => {
    dispatch(setShowCompose(true));
  };

  return (
    <div className="h-screen flex">
      <aside
        id="default-sidebar"
        className="top-0 left-0 w-64 h-full transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 bg-slate-500">
          <ul className="space-y-2 font-medium">
            <li>
              <div
                className={`${
                  showCompose === true
                    ? "flex items-center p-2 text-black bg-gray-200 rounded-lg group"
                    : "flex items-center p-2 text-gray-200 rounded-lg hover:bg-slate-600 group "
                }`}
                onClick={() => handleComposeTab()}
              >
                <svg
                  className="flex-shrink-0 w-6 h-6 text-gray-200 transition duration-75 group-hover:text-gray-900"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                  <line x1="16" y1="5" x2="19" y2="8" />
                </svg>
                <span className="flex-1 ms-2 whitespace-nowrap font-bold text-lg">
                  Compose
                </span>
              </div>
            </li>
            <li>
              <div
                className={`${
                  activeTab === "Inbox"
                    ? "flex items-center p-2 text-black bg-gray-200 rounded-lg group"
                    : "flex items-center p-2 text-gray-200 rounded-lg hover:bg-slate-600 group "
                }`}
                onClick={() => handleTabClick("Inbox")}
              >
                <svg
                  className={` ${
                    activeTab === "Inbox"
                      ? "flex-shrink-0 w-5 h-5 text-gray-900 transition duration-75"
                      : "flex-shrink-0 w-5 h-5 text-gray-200 transition duration-75 group-hover:text-gray-900"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-black bg-gray-100 hover:bg-gray-500 rounded-full">
                  {unReadCount}
                </span>
              </div>
            </li>
            <li>
              <div
                href="#Sentbox"
                className={`${
                  activeTab === "Sentbox"
                    ? "flex items-center p-2 text-black bg-gray-200 rounded-lg group"
                    : "flex items-center p-2 text-gray-200 rounded-lg hover:bg-slate-600 group "
                }`}
                onClick={() => handleTabClick("Sentbox")}
              >
                <svg
                  className={` ${
                    activeTab === "Sentbox"
                      ? "flex-shrink-0 w-5 h-5 text-gray-900 transition duration-75"
                      : "flex-shrink-0 w-5 h-5 text-gray-200 transition duration-75 group-hover:text-gray-900"
                  }`}
                  viewBox="0 0 24 20"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Sentbox</span>
              </div>
            </li>
            <li>
              <div
                className={`${
                  activeTab === "Logout"
                    ? "flex items-center p-2 text-black bg-gray-200 rounded-lg group"
                    : "flex items-center p-2 text-gray-200 rounded-lg hover:bg-slate-600 group "
                }`}
                onClick={() => handleTabClick("Logout")}
              >
                <svg
                  className={` ${
                    activeTab === "Logout"
                      ? "flex-shrink-0 w-5 h-5 text-gray-900 transition duration-75"
                      : "flex-shrink-0 w-5 h-5 text-gray-200 transition duration-75 group-hover:text-gray-900"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Log out</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
      <div className="flex-1 h-full overflow-y-auto">
        {activeTab === "Inbox" && <Inbox />}
        {activeTab === "Sentbox" && <Sentbox />}
      </div>
      {showCompose && (
        <div className="fixed bottom-5 right-0 w-1/2">
          <Compose />
        </div>
      )}
    </div>
  );
};
export default Home;
