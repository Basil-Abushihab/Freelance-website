"use client";
import React, { useState, useEffect } from "react";

type Freelancer = {
  id: number;
  username: string;
  skills: string[];
  profilePicture: string;
};

const FindFreelancer: React.FC = () => {
  const [projectDetails, setProjectDetails] = useState({
    description: "",
    budget: "",
    deadline: "",
  });
  const [posts, setPosts] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPostId, setCurrentPostId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProjectDetails({
      ...projectDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No token found. Please log in.");
      return;
    }

    const postData = {
      description: projectDetails.description,
      budget: projectDetails.budget,
      deadline: projectDetails.deadline,
    };

    try {
      const response = await fetch("/api/posts", {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(
          isEditing ? { id: currentPostId, ...postData } : postData
        ),
      });

      if (response.ok) {
        const newPost = await response.json();
        if (isEditing) {
          setPosts(
            posts.map((post) =>
              post._id === currentPostId ? newPost.data : post
            )
          );
          setSuccessMessage("Post updated successfully!");
        } else {
          setPosts([...posts, newPost.data]);
          setSuccessMessage("Project posted successfully!");
        }
        setProjectDetails({ description: "", budget: "", deadline: "" });
        setIsEditing(false);
        setCurrentPostId(null);
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Failed to post project.");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");
      if (response.ok) {
        const data = await response.json();
        setPosts(data.data);
      } else {
        setErrorMessage("Failed to fetch posts.");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred while fetching posts.");
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErrorMessage("No token found. Please log in.");
      return;
    }

    try {
      const response = await fetch("/api/posts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        setPosts(posts.filter((post) => post._id !== id));
        setSuccessMessage("Post deleted successfully.");
      } else {
        const error = await response.json();
        setErrorMessage(error.message || "Failed to delete post.");
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  const handleEdit = (post: any) => {
    setProjectDetails({
      description: post.description,
      budget: post.budget,
      deadline: post.deadline,
    });
    setIsEditing(true);
    setCurrentPostId(post._id);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Form Section */}
      <div className="p-4 border border-gray-300 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Find a Freelancer</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="description">
              Project Description
            </label>
            <textarea
              id="description"
              name="description"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              value={projectDetails.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="budget">
              Budget
            </label>
            <input
              type="text"
              id="budget"
              name="budget"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={projectDetails.budget}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700" htmlFor="deadline">
              Deadline
            </label>
            <input
              type="date"
              id="deadline"
              name="deadline"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              value={projectDetails.deadline}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            {isEditing ? "Update Project" : "Post Project"}
          </button>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          {successMessage && (
            <p className="text-green-500 mt-2">{successMessage}</p>
          )}
        </form>
      </div>

      {/* Posts Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-4">All Posts</h2>
        {posts.map((post) => (
          <div key={post._id} className="border p-4 rounded-md shadow-sm">
            <h3 className="font-bold">{post.description}</h3>
            <p className="text-gray-600">Budget: {post.budget}</p>
            <p className="text-gray-600">Deadline: {post.deadline}</p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleEdit(post)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
              >
                Edit Post
              </button>
              <button
                onClick={() => handleDelete(post._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Delete Post
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindFreelancer;
