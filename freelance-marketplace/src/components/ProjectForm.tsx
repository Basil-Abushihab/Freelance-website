import { useState } from "react";

interface ProjectFormProps {
  onSubmit?: (project: {
    description: string;
    budget: number;
    deadline: string;
  }) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit }) => {
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState<number | "">("");
  const [deadline, setDeadline] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (description && budget && deadline) {
      const project = {
        description,
        budget: Number(budget),
        deadline,
      };

      try {
        const token = localStorage.getItem("token");

        const response = await fetch("/api/projects", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(project),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Failed to post project");
        }

        const data = await response.json();
        setSuccess("Project posted successfully!");

        setDescription("");
        setBudget("");
        setDeadline("");

        if (onSubmit) {
          onSubmit(data);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      }
    }
  };

  return (
    <form
      className="max-w-md mx-auto p-6 bg-white border rounded-lg shadow-lg mt-6"
      onSubmit={handleSubmit}
    >
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Post a Project
      </h3>
      <textarea
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4 resize-none"
        placeholder="Project Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        rows={4}
      />
      <input
        type="number"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        placeholder="Budget"
        value={budget}
        onChange={(e) =>
          setBudget(e.target.value === "" ? "" : Number(e.target.value))
        }
        required
      />
      <input
        type="date"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
      <button
        type="submit"
        className="w-full p-3 text-white bg-blue-600 rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        Post Project
      </button>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {success && <p className="text-green-500 mt-4 text-center">{success}</p>}
    </form>
  );
};

export default ProjectForm;
