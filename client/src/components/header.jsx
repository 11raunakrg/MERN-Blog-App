import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-gray-700 px-10 py-7 text-white flex items-center justify-around">
      <h1 className="text-5xl font-bold">MERN Blog App</h1>
      <ul className="flex text-gray-300 font-semibold gap-7 cursor-pointer underline">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/add">
          <li>Add New Blog</li>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
