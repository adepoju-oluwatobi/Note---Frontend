import React from "react";
import Menu from "../assets/menu.svg";
import NewNote from "../assets/edit.svg";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useSidebarToggle } from "../sidebarToggle";

function Header() {
  const { isSidebarVisible, toggleSidebar } = useSidebarToggle();
  return (
    <div>
      <div className="flex justify-between p-2 border-[gray] border-b-[1px]">
        <div id="menu-icon" onClick={toggleSidebar}>
          <img className="w-6" src={Menu} alt="" />
        </div>
        <div>
          <p className="text-white">All Notes</p>
        </div>
        <div>
          <Link to="/add_notes">
            <img className="w-6" src={NewNote} alt="" />
          </Link>
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

export default Header;
