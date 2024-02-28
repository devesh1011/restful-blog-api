const router = require("express").Router();
const Blog = require("../models/Blog");
const { handleError } = require("../middleware/errorHandler");

// GET all blogs with pagination
router.get("/blogs", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const totalBlogs = await Blog.countDocuments();
    const blogs = await Blog.find().skip(startIndex).limit(limit);

    const pagination = {};
    if (endIndex < totalBlogs) {
      pagination.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    return res.status(200).json({ success: true, data: blogs, pagination });
  } catch (error) {
    console.error(error.message);
    return handleError(res, 500, "Server Error");
  }
});

// GET a single blog
router.get("/blogs/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return handleError(res, 404, "Blog not found");
    }

    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error(error.message);
    return handleError(res, 500, "Server Error");
  }
});

// Create a new blog
router.post("/blogs", async (req, res) => {
  const { title, content } = req.body;

  // Simple validation
  if (!title || !content) {
    return handleError(res, 400, "Title and content are required");
  }

  try {
    const newBlog = await Blog.create({
      title,
      content,
    });

    return res.status(201).json({ success: true, data: newBlog });
  } catch (error) {
    console.error(error.message);
    return handleError(res, 500, "Server Error");
  }
});

// Update a blog by ID
router.put("/blogs/:id", async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  // Simple validation
  if (!title && !content) {
    return handleError(res, 400, "Title or content is required");
  }

  try {
    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );

    if (!blog) {
      return handleError(res, 404, "Blog not found");
    }

    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error(error.message);
    return handleError(res, 500, "Server Error");
  }
});

// Partially update a blog by ID
router.patch("/blogs/:id", async (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  // Simple validation
  if (!title) {
    return handleError(res, 400, "Title is required");
  }

  try {
    const blog = await Blog.findByIdAndUpdate(id, { title }, { new: true });

    if (!blog) {
      return handleError(res, 404, "Blog not found");
    }

    return res.status(200).json({ success: true, data: blog });
  } catch (error) {
    console.error(error.message);
    return handleError(res, 500, "Server Error");
  }
});

// Delete a blog by ID
router.delete("/blogs/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);

    if (!blog) {
      return handleError(res, 404, "Blog not found");
    }

    await Blog.findByIdAndDelete(id);

    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error(error.message);
    return handleError(res, 500, "Server Error");
  }
});

module.exports = router;
