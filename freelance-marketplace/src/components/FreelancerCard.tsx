import React from "react";

interface Freelancer {
  id: number;
  username: string;
  skills: string[];
  hourlyRate: number;
}

interface FreelancerCardProps {
  freelancer: Freelancer;
}

const FreelancerCard: React.FC<FreelancerCardProps> = ({ freelancer }) => {
  return (
    <div className="border rounded-md p-4 shadow-md">
      <h3 className="font-bold text-lg">{freelancer.username}</h3>
      <p className="text-gray-600">Skills: {freelancer.skills.join(", ")}</p>
      <p className="text-gray-800">Hourly Rate: ${freelancer.hourlyRate}</p>
      <button className="bg-green-500 text-white p-2 rounded-md mt-4">
        Send Invitation
      </button>
    </div>
  );
};

export default FreelancerCard;
