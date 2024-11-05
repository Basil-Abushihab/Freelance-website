"use client";
import React, { useEffect, useState } from "react";

type Post = {
  _id: string;
  description: string;
  budget: string;
  deadline: string;
  userName: string;
};

const AllPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [proposalDescriptions, setProposalDescriptions] = useState<{
    [key: string]: string;
  }>({});
  const [proposalErrors, setProposalErrors] = useState<{
    [key: string]: string;
  }>({});

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
      console.error("Error fetching posts:", error);
      setErrorMessage("An unexpected error occurred while fetching posts.");
    }
  };

  const handleProposalSubmit = async (postId: string) => {
    const proposalDescription = proposalDescriptions[postId];

    if (!proposalDescription) {
      setProposalErrors((prev) => ({
        ...prev,
        [postId]: "Please enter a proposal description.",
      }));
      return;
    }

    setProposalErrors((prev) => ({ ...prev, [postId]: "" }));

    const token = localStorage.getItem("token");
    if (!token) {
      setProposalErrors((prev) => ({
        ...prev,
        [postId]: "No token provided.",
      }));
      return;
    }

    try {
      const response = await fetch("/api/proposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          postId,
          description: proposalDescription,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Proposal submitted successfully!");
        setProposalDescriptions((prev) => ({ ...prev, [postId]: "" }));
      } else {
        const errorData = await response.json();
        setProposalErrors((prev) => ({
          ...prev,
          [postId]: errorData.message || "Failed to submit proposal.",
        }));
      }
    } catch (error) {
      console.error("Error submitting proposal:", error);
      setProposalErrors((prev) => ({
        ...prev,
        [postId]: "An unexpected error occurred while submitting the proposal.",
      }));
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <div key={post._id} className="border p-4 rounded-md shadow-sm">
            <h3 className="font-bold">{post.description}</h3>
            <p className="text-gray-600">Budget: {post.budget}</p>
            <p className="text-gray-600">Deadline: {post.deadline}</p>
            <p className="text-gray-600">Posted by: {post.userName}</p>

            <div className="mt-4">
              <textarea
                value={proposalDescriptions[post._id] || ""}
                onChange={(e) =>
                  setProposalDescriptions((prev) => ({
                    ...prev,
                    [post._id]: e.target.value,
                  }))
                }
                placeholder="Enter your proposal..."
                className="border p-2 rounded w-full"
                rows={3}
                required
              />
              <button
                onClick={() => handleProposalSubmit(post._id)}
                className="mt-2 bg-blue-500 text-white p-2 rounded"
              >
                Apply Proposal
              </button>
              {proposalErrors[post._id] && (
                <p className="text-red-500">{proposalErrors[post._id]}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPosts;
