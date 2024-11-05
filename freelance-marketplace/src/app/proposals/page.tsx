"use client";
import React, { useEffect, useState } from "react";

type Proposal = {
  _id: string;
  description: string;
  status: string;
  createdAt: string;
  proposerName: string;
};

type PostWithProposals = {
  post: {
    _id: string;
    description: string;
    budget: string;
    deadline: string;
    posterName: string;
  };
  proposals: Proposal[];
};

const Page = () => {
  const [postsWithProposals, setPostsWithProposals] = useState<
    PostWithProposals[]
  >([]);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchPostsWithProposals = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/proposals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPostsWithProposals(data.data);
      }
    } catch (error) {
      console.error("Error fetching posts with proposals:", error);
      setErrorMessage("An unexpected error occurred while fetching posts.");
    }
  };

  useEffect(() => {
    fetchPostsWithProposals();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Proposals</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="grid grid-cols-1 gap-4">
        {postsWithProposals.map(({ post, proposals }) => (
          <div key={post._id} className="border p-4 rounded-md shadow-sm">
            <h3 className="font-bold">Post: {post.description}</h3>
            <p className="text-gray-600">Budget: {post.budget}</p>
            <p className="text-gray-600">
              Deadline: {new Date(post.deadline).toLocaleDateString()}
            </p>
            <p className="text-gray-600">Posted by: {post.posterName}</p>

            <h4 className="font-semibold mt-4">Proposals:</h4>
            {proposals.length > 0 ? (
              proposals.map((proposal) => (
                <div key={proposal._id} className="border-t pt-2 mt-2">
                  <p className="text-gray-600">
                    Description: {proposal.description}
                  </p>
                  <p className="text-gray-600">
                    Proposed by: {proposal.proposerName}
                  </p>
                  <p className="text-gray-600">Status: {proposal.status}</p>
                  <p className="text-gray-600">
                    Created At: {new Date(proposal.createdAt).toLocaleString()}
                  </p>
                  {proposal.status === "pending" && (
                    <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                      Approve
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-600">No proposals for this post.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
