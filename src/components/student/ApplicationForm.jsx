import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useUser } from "../../context/userContext";

const ApplicationForm = () => {
  const { applydetails } = useUser();

  const [formData, setFormData] = useState({
    jobTitle: applydetails.jobTitle,
    jobDescription: applydetails.jobDescription,
    skills: applydetails.skillsRequired,
    deadline: applydetails.applicationDeadline,
    jobTitleuser: '',
    coverLetter: '',
    resume: null,
    fullName: '',
    contactAddress: '',
    phoneNumber: '',
    emailAddress: '',
    dateOfBirth: '',
    highestEducation: '',
    schoolsAttended: '',
    majorFieldOfStudy: '',
    status:""
  });

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  // Handle file input (resume upload)
  const handleFileChange = (e) => {
    setFormData(prevState => ({ ...prevState, resume: e.target.files[0] }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    // Axios POST request to backend
    axios.post('https://placement-portal-1-n4rt.onrender.com/api/student/applications', formDataToSend)
      .then(response => {
        alert('Application submitted successfully');
        // Reset form after submission
        setFormData({
          jobTitle: applydetails.jobTitle,
          jobDescription: applydetails.jobDescription,
          skills: applydetails.skillsRequired,
          deadline: applydetails.applicationDeadline,
        
      status:"",
          resume: null,
          fullName: '',
          contactAddress: '',
          phoneNumber: '',
          emailAddress: '',
          dateOfBirth: '',
          highestEducation: '',
          schoolsAttended: '',
          majorFieldOfStudy: '',
        });
      })
      .catch(error => {
        console.error(error);
        alert('Failed to submit application');
      });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-r from-gray-100 to-gray-50 min-h-screen mt-14">
      {/* Job Details */}
      <div className="bg-gray-100 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold">{applydetails.jobTitle}</h3>
        <p className="text-sm text-gray-600">
          <strong>Description:</strong> {applydetails.jobDescription || "No description available"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Skills Required:</strong> {applydetails.skillsRequired?.join(", ") || "None"}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Application Deadline:</strong> {applydetails.applicationDeadline ? new Date(applydetails.applicationDeadline).toLocaleDateString() : "Not specified"}
        </p>
      </div>

      {/* Application Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 max-w-3xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Apply for a Job</h2>

        {/* Full Name */}
        <label className="block">
          <span className="text-lg text-gray-700 font-semibold">Full Name:</span>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            placeholder="Enter your full name"
            required
          />
        </label>

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="block">
            <span className="text-lg text-gray-700 font-semibold">Contact Address:</span>
            <input
              type="text"
              name="contactAddress"
              value={formData.contactAddress}
              onChange={handleInputChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              placeholder="Enter your contact address"
              required
            />
          </label>

          <label className="block">
            <span className="text-lg text-gray-700 font-semibold">Phone Number:</span>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
              placeholder="Enter your phone number"
              required
            />
          </label>
        </div>

        {/* Email Address */}
        <label className="block">
          <span className="text-lg text-gray-700 font-semibold">Email Address:</span>
          <input
            type="email"
            name="emailAddress"
            value={formData.emailAddress}
            onChange={handleInputChange}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            placeholder="Enter your email address"
            required
          />
        </label>

        {/* Date of Birth */}
        <label className="block">
          <span className="text-lg text-gray-700 font-semibold">Date of Birth:</span>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            required
          />
        </label>

        {/* Education Details */}
        <label className="block">
          <span className="text-lg text-gray-700 font-semibold">Highest Education:</span>
          <input
            type="text"
            name="highestEducation"
            value={formData.highestEducation}
            onChange={handleInputChange}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            placeholder="Enter your highest level of education"
            required
          />
        </label>

        {/* Schools Attended */}
        <label className="block">
          <span className="text-lg text-gray-700 font-semibold">Schools Attended:</span>
          <input
            type="text"
            name="schoolsAttended"
            value={formData.schoolsAttended}
            onChange={handleInputChange}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            placeholder="Enter the schools you attended"
            required
          />
        </label>

        {/* Major Field of Study */}
        <label className="block">
          <span className="text-lg text-gray-700 font-semibold">Major Field of Study:</span>
          <input
            type="text"
            name="majorFieldOfStudy"
            value={formData.majorFieldOfStudy}
            onChange={handleInputChange}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            placeholder="Enter your major field of study"
            required
          />
        </label>

        {/* Resume Upload */}
        <label className="block">
          <span className="text-lg text-gray-700 font-semibold">Resume:</span>
          <input
            type="file"
            name="resume"
            onChange={handleFileChange}
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
            required
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition duration-300"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
