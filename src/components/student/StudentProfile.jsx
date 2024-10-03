import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../context/userContext'; // Import useUser hook

const StudentProfile = () => {
  const { user } = useUser(); // Use useUser hook to access user context
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    dob: '',
    percentage10th: '',
    percentage12th: '',
    collegeGPA: '',
    resume: '',
    academicRecords: '',
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = user?._id;

        if (!userId) {
          console.error('User ID is not available');
          return;
        }

        const response = await axios.get(`https://placement-portal-1-n4rt.onrender.com/api/student/profile/${userId}`);

        if (response.data) {
          setProfile(response.data);
          setIsEditing(true);
        }
      } catch (error) {
        console.error('Error fetching student profile:', error);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        // Update profile
        await axios.put('https://placement-portal-1-n4rt.onrender.com/api/student/profile', {
          ...profile,
          userId: user?._id, // Pass userId from user context
        });
        alert('Profile updated successfully!');
        setProfile(response.data); // Fixed the alert message
      } else {
        // Create profile
        await axios.post('https://placement-portal-1-n4rt.onrender.com/api/student/profile', {
          ...profile,
          userId: user?._id, // Pass userId from user context
        });
        alert('Profile created successfully!');
        setProfile(response.data); 
        setIsEditing(true);// Fixed the alert message
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Error saving profile. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-5">{isEditing ? 'Edit Profile' : 'Create Profile'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={profile.dob}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="percentage10th" className="block text-sm font-medium text-gray-700">10th Percentage</label>
          <input
            type="number"
            id="percentage10th"
            name="percentage10th"
            value={profile.percentage10th}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="percentage12th" className="block text-sm font-medium text-gray-700">12th Percentage</label>
          <input
            type="number"
            id="percentage12th"
            name="percentage12th"
            value={profile.percentage12th}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="collegeGPA" className="block text-sm font-medium text-gray-700">College GPA</label>
          <input
            type="number"
            step="0.01"
            id="collegeGPA"
            name="collegeGPA"
            value={profile.collegeGPA}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Resume (File Path)</label>
          <input
            type="text"
            id="resume"
            name="resume"
            value={profile.resume}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="academicRecords" className="block text-sm font-medium text-gray-700">Academic Records (File Path)</label>
          <input
            type="text"
            id="academicRecords"
            name="academicRecords"
            value={profile.academicRecords}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500"
        >
          {isEditing ? 'Update Profile' : 'Create Profile'}
        </button>
      </form>

      {/* Display Profile Information */}
      <div className="mt-10">
        {profile && (
          <div>
            <h3 className="text-xl font-semibold">Profile Information</h3>
            <p><strong>Full Name:</strong> {profile.fullName}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Date of Birth:</strong> {new Date(profile.dob).toLocaleDateString()}</p>
            <p><strong>10th Percentage:</strong> {profile.percentage10th}%</p>
            <p><strong>12th Percentage:</strong> {profile.percentage12th}%</p>
            <p><strong>College GPA:</strong> {profile.collegeGPA}</p>
            <p><strong>Resume:</strong> {profile.resume}</p>
            <p><strong>Academic Records:</strong> {profile.academicRecords}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
