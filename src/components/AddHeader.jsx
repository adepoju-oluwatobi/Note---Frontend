import React from "react";
import Menu from "../assets/menu.svg";
import Back from "../assets/back.svg";
import { Link } from "react-router-dom";
import { useSidebarToggle } from "../sidebarToggle";
import Sidebar from "./Sidebar";

function AddHeader() {
  const { isSidebarVisible, toggleSidebar } = useSidebarToggle();
  return (
    <div>
      <div className="flex justify-between p-2 border-[gray] border-b-[1px]">
      <div>
        <Link to="/notes">
          <img className="w-6" src={Back} alt="" />
        </Link>
      </div>

      <div>
        <p className="text-white">Add Note</p>
      </div>

      <div>
        <img onClick={toggleSidebar} className="w-6" src={Menu} alt="" />
      </div>
    </div>
    <div
        id="sidebar"
        className={`absolute ${isSidebarVisible ? "" : "hidden"}`}
      >
        <Sidebar />
      </div>
    </div>
  );
}

export default AddHeader;
