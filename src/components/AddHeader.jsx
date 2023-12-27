import React from "react";
import Menu from "../assets/menu.svg";
import Back from "../assets/back.svg";
import { Link } from "react-router-dom";

function AddHeader() {
  return (
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
        <img className="w-6" src={Menu} alt="" />
      </div>
    </div>
  );
}

export default AddHeader;
