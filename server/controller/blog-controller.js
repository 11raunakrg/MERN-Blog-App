const mongoose = require("mongoose");
const Blog = require("../model/Blog.js");

//fetch list of blogs, delete blog, update blog, add a new blog

const fetchListOfBlogs = async (req, res) => {
  let blogList;
  try {
    blogList = await Blog.find();
  } catch (error) {
    return res.status(500).json({ message: "Fetching blogs failed", error });
  }

  if (!blogList || blogList.length == 0) {
    return res.status(404).json({ message: "No Blogs found" });
  }

  return res.status(200).json({ blogList });
};

const addNewBlog = async (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }

  let newBlog;
  try {
    newBlog = await Blog.create({
      title,
      description,
      date: new Date(),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Adding blog failed", error });
  }

  return res.status(200).json({ newBlog });
};

const deleteABlog = async (req, res) => {
  const id = req.params.id;

  try {
    const findCurrentBlog = await Blog.findByIdAndDelete(id);

    if (!findCurrentBlog) {
      return res.status(404).json({ message: "Blog Not Found" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Deletion failed", error });
  }

  return res.status(200).json({ message: "Deletion successfull" });
};

const updateABlog = async (req, res) => {
  const id = req.params.id;

  const { title, description } = req.body;

  let currentBlogToUpdate;
  try {
    currentBlogToUpdate = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        description,
      },
      { new: true }
    );
    if (!currentBlogToUpdate) {
      return res.status(404).json({ message: "Blog not found" });
    }
  } catch (error) {
    console.log(error);
    return res
      .send(500)
      .json({ message: "Something went wrong while updating", error });
  }

  return res.status(200).json({ currentBlogToUpdate });
};

module.exports = { fetchListOfBlogs, addNewBlog, deleteABlog, updateABlog };
