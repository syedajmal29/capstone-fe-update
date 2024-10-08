import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://placement-portal-1-n4rt.onrender.com/posted-jobs');
        setJobs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load jobs');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Delete job function
  const deleteJob = async (jobId) => {
    try {
      await axios.delete(`https://placement-portal-1-n4rt.onrender.com/posted-jobs/${jobId}`);
      // Update the UI by removing the deleted job from the list
      console.log(jobId)
      setJobs(jobs.filter((job) => job._id !== jobId));
    } catch (err) {
      console.error("Failed to delete job:", err);
      setError("Failed to delete job");
    }
  };

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Job Postings Management</h2>
      <ul className="divide-y divide-gray-200">
        {jobs.map((job) => (
          <li key={job._id} className="py-4 flex justify-between items-center">
            <div>
              <p className="font-semibold">{job.jobTitle}</p>
              <p className="text-gray-600">{job.jobDescription}</p>
              <p className="text-sm text-gray-500">
                Skills: {job.skillsRequired.join(', ')}
              </p>
              <p className="text-sm text-gray-500">
                Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                Salary: ₹{job.salary.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                Experience Required: {job.experienceRequired} years
              </p>
              <p className="text-sm text-gray-500">
                Posted On: {new Date(job.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => deleteJob(job._id)}
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

export default JobManagement;
