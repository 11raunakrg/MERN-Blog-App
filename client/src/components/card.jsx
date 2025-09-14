import React, { useState } from "react";
import axios from "axios";

const Card = ({ data, onDelete, onUpdate }) => {
  const { title, description } = data;

  const [isEdit, setIsEdit] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editDesc, setEditDesc] = useState(description);

  const blogDate = new Date(data.date);
  const dateStr = blogDate.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
  const timeStr = blogDate.toLocaleTimeString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  const handleDeleteBlog = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/blogs/delete/${data._id}`
      );
      //   console.log(res.data);
      onDelete(data._id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateBlog = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/blogs/update/${data._id}`,
        { title: editTitle, description: editDesc }
      );
      onUpdate(res.data);
      setIsEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid px-4 py-6 gap-4 bg-gray-400 min-w-80 rounded flex-wrap">
      <div className="flex justify-between items-center">
        {isEdit ? (
          <input
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className="border px-2 py-1 rounded w-full mr-2"
          />
        ) : (
          <h1 className="text-2xl font-bold">{title}</h1>
        )}
        <div className="flex gap-2">
          {isEdit ? (
            <>
              <button
                onClick={handleUpdateBlog}
                className="bg-green-700 text-white px-2 py-1 rounded cursor-pointer"
              >
                Save
              </button>
              <button
                onClick={() => setIsEdit(false)}
                className="bg-gray-700 text-white px-2 py-1 rounded cursor-pointer"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleDeleteBlog}
                className="bg-red-700 text-white px-2 py-1 rounded cursor-pointer"
              >
                Delete
              </button>
              <button
                onClick={() => setIsEdit(true)}
                className="bg-white text-black px-2 py-1 rounded cursor-pointer"
              >
                Update
              </button>
            </>
          )}
        </div>
      </div>
      {isEdit ? (
        <textarea
          value={editDesc}
          onChange={(e) => setEditDesc(e.target.value)}
          className="border p-2 rounded w-full"
        />
      ) : (
        <h3 className="text-lg text-gray-900 font-semibold">{description}</h3>
      )}
      <div className="flex gap-2 font-semibold text-sm text-blue-900">
        <h5>{dateStr}</h5>
        <h5>{timeStr}</h5>
      </div>
    </div>
  );
};

export default Card;
