import React, { useContext, useState } from "react";
import { GlobalContext } from "../context/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const { formData, setFormData } = useContext(GlobalContext);

  const navigate = useNavigate();

  const handleSaveDatatToDB = async () => {
    const response = axios.post("http://localhost:3000/api/blogs/add", {
      title: formData.title,
      description: formData.description,
    });

    const result = (await response).data;
    console.log(result);

    if (result) {
      setFormData({
        title: "",
        description: "",
      });
      navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center mt-20">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // console.log(formData);
        }}
        className="min-w-72 px-12 py-12 bg-gray-300 rounded-xl"
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Add a New Blog
        </h1>
        <div className="my-8">
          <h3 className="text-lg font-semibold mb-2">Enter Title here : </h3>
          <input
            type="text"
            placeholder="Please enter title....."
            value={formData.title}
            className="text-lg px-4 py-2 border-2 rounded"
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />
        </div>

        <div className="my-8">
          <h3 className="text-lg font-semibold mb-2">Enter Description : </h3>
          <textarea
            className="px-3 py-3 text-md w-full resize-none min-h-20 border-2 rounded"
            value={formData.description}
            placeholder="write description here..."
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />
        </div>
        <button
          onClick={handleSaveDatatToDB}
          className="font-semibold text-white bg-green-800 rounded px-3 py-2 cursor-pointer"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
