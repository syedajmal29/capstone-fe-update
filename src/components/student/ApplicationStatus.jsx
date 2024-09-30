import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ApplicationStatus = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch applications for a job posting
    const fetchApplications = async () => {
      try {
        const response = await axios.get('https://placement-portal-1-n4rt.onrender.com/api/student/applications_list');
        console.log(response.data); // Debugging response data
        setApplications(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching applications', error);
        setError('Failed to load applications.');
      }
    };

    fetchApplications();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-16">
      <h2 className="text-2xl font-semibold mb-4 text-center">Application Status</h2>
      <ul>
        {applications.length === 0 ? (
          <p className="text-center text-gray-500">No applications found.</p>
        ) : (
          applications.map(app => (
            <li key={app._id} className="border-b py-4 hover:bg-gray-100 transition duration-200">
              <h3 className="font-medium text-lg text-gray-800">{app.jobTitle}</h3>
              <div className="flex flex-col gap-2 mt-2">
                <p className="font-medium">Status:</p>
                <p className={`font-medium ${app.status === 'Applied' ? 'text-blue-500' : 'text-gray-400'}`}>Applied</p>
                <p className={`font-medium ${app.status === 'Placed' ? 'text-green-500' : 'text-gray-400'}`}>Placed</p>
                <p className={`font-medium ${app.status === 'Waiting' ? 'text-yellow-500' : 'text-gray-400'}`}>Waiting</p>
                <p className={`font-medium ${app.status === 'Rejected' ? 'text-red-500' : 'text-gray-400'}`}>Rejected</p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ApplicationStatus;
