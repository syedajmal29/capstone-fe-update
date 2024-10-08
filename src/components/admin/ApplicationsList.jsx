import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is installed

const ApplicationsList = () => {
  const [applications, setApplications] = useState([]); // Initialize applications as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get("https://placement-portal-1-n4rt.onrender.com/student-application"); // Adjust the API endpoint if needed
        setApplications(response.data || []); // Ensure applications is always an array
      } catch (err) {
        setError("Failed to load applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  // Delete application function
  const deleteApplication = async (applicationId) => {
    try {
      await axios.delete(`https://placement-portal-1-n4rt.onrender.com/applications/${applicationId}`);
      // Update the UI by removing the deleted application from the list
      setApplications(applications.filter((app) => app._id !== applicationId));
    } catch (err) {
      console.error("Failed to delete application:", err);
      setError("Failed to delete application");
    }
  };

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p>{error}</p>;

  // Ensure applications is an array before mapping
  if (!Array.isArray(applications) || applications.length === 0) {
    return <p>No applications available.</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Applications List</h2>
      <ul className="divide-y divide-gray-200">
        {applications.map((application) => (
          <li key={application._id} className="py-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{application.fullName}</p>
              <p className="text-gray-600">Job Title: {application.jobTitle}</p>
              <p className="text-sm text-gray-500">Email: {application.emailAddress}</p>
              <p className="text-sm text-gray-500">Phone: {application.phoneNumber}</p>
              <p className="text-sm text-gray-500">Education: {application.highestEducation}</p>
              <p className="text-sm text-gray-500">Skills: {application.skills.join(", ")}</p>
              <p className="text-sm text-gray-500">Date of Birth: {new Date(application.dateOfBirth).toLocaleDateString()}</p>
              <p className="text-sm text-gray-500">Address: {application.contactAddress}</p>
              <p className="text-sm text-gray-500">Application Date: {new Date(application.applicationDate).toLocaleDateString()}</p>
            </div>
            <button
              onClick={() => deleteApplication(application._id)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApplicationsList;
