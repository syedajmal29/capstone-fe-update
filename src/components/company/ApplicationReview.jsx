import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ApplicationReview = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  const updateStatus = async (applicationId, status) => {
   console.log(applicationId)
    try {
      await axios.put(`https://placement-portal-1-n4rt.onrender.com/api/student/application/${applicationId}`);
      
      
      
    } catch (error) {
      console.error('Error updating application status', error);
      setError('Failed to update application status.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Review Applications</h2>
      {error && <p className="text-red-500">{error}</p>}
      {applications.length === 0 ? (
        <p>No applications to review.</p>
      ) : (
        <ul className="space-y-4">
          {applications.map((app) => (
            <li key={app._id} className="bg-white p-4 shadow rounded">
              <h3 className="text-xl font-semibold">{app.fullName}</h3>
              <p>Job Title: {app.jobTitle}</p>
              <p>Contact Address: {app.contactAddress}</p>
              <p>Phone Number: {app.phoneNumber}</p>
              <p>Email Address: {app.emailAddress}</p>
              <p>Date of Birth: {new Date(app.dateOfBirth).toLocaleDateString()}</p>
              <p>Highest Education: {app.highestEducation}</p>
              <p>Schools Attended: {app.schoolsAttended}</p>
              <p>Major Field of Study: {app.majorFieldOfStudy}</p>
              <p>Skills: {app.skills.join(', ')}</p>
              <p>
                Resume: <a href={app.resume} download className="text-blue-500 hover:underline">Download</a>
              </p>
              <p>Status: {app.status}</p>
              <div className="mt-2">
                <button
                  onClick={() => updateStatus(app._id, 'shortlisted')}
                  className="text-green-500 hover:underline mr-4"
                >
                  Shortlist
                </button>
                <button
                  onClick={() => updateStatus(app._id, 'rejected')}
                  className="text-red-500 hover:underline"
                >
                  Reject
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApplicationReview;
