import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/card";

const Home = () => {
  const [blogList, setBlogList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/blogs/");
      const data = response.data.blogList;
      setBlogList(data || []);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setBlogList((prev) => prev.filter((blog) => blog._id !== id));
  };

  const handleUpdate = (updatedBlog) => {
    setBlogList((prev) =>
      prev.map((blog) => (blog._id === updatedBlog._id ? updatedBlog : blog))
    );
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="container flex px-10 mt-10">
      {loading && (
        <h1 className="text-4xl font-bold text-red-600">
          Loading data, please wait.....
        </h1>
      )}

      {!loading && error && (
        <h1 className="text-4xl font-bold">
          An error occured while fetching data , ${error}
        </h1>
      )}

      {!loading && !error && blogList.length === 0 && (
        <h3 className="text-2xl font-bold text-center">
          There are no blogs present. <br /> Please add some blogs.
        </h3>
      )}

      {!loading && !error && blogList.length > 0 && (
        <div className="grid grid-cols-3 gap-12 md:grid-cols-2 sm:grid-cols-1">
          {blogList.map((blog) => (
            <Card
              key={blog._id}
              data={blog}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
