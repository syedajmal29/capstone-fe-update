import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import UsersList from "./UsersList";
import JobManagement from "./JobManagement";
import ApplicationsList from "./ApplicationsList";
import axios from "axios";

const AdminDashboard = () => {
  const [totalapplications, settotalapplications] = useState([]);
  const [totaljobs, settotaljobs] = useState([]);
  const [totalusers, settotalusers] = useState([]);
  async function applications() {
    const response = await axios.get(
      "http://localhost:5000/student-application"
    );
    console.log(response);
    settotalapplications(response.data.length);
  }
  async function jobs() {
    const response = await axios.get("http://localhost:5000/posted-jobs");
    console.log(response);
    settotaljobs(response.data.length);
  }

  async function users() {
    const response = await axios.get("http://localhost:5000/users-admin");
    console.log(response);
    settotalusers(response.data.length);
  }

  applications();
  jobs();
  users();
  return (
    <div className="flex min-h-screen mt-14 bg-gradient-to-b from-gray-100 to-gray-50">
      <div className="flex-grow p-6 max-w-6xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Admin Dashboard
          </h1>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <div className="block p-6 bg-red-600 text-white rounded-lg shadow-lg transition duration-200">
            <h2 className="text-xl font-semibold mb-2">Total Applications</h2>
            <p className="text-sm opacity-80">{totalapplications}</p>
          </div>
          <div className="block p-6 bg-orange-600 text-white rounded-lg shadow-lg transition duration-200">
            <h2 className="text-xl font-semibold mb-2">Posted Jobs</h2>
            <p className="text-sm opacity-80">{totaljobs}</p>
          </div>
          <div className="block p-6 bg-yellow-600 text-white rounded-lg shadow-lg transition duration-200">
            <h2 className="text-xl font-semibold mb-2">Total</h2>
            <p className="text-sm opacity-80">{totalusers} Users</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Link
            to="/admin/users"
            className="block p-6 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
          >
            <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
            <p className="text-sm opacity-80">View and manage user accounts</p>
          </Link>

          <Link
            to="/admin/jobs"
            className="block p-6 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-200"
          >
            <h2 className="text-xl font-semibold mb-2">Manage Job Postings</h2>
            <p className="text-sm opacity-80">Oversee all job postings</p>
          </Link>

          <Link
            to="/admin/applications"
            className="block p-6 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition duration-200"
          >
            <h2 className="text-xl font-semibold mb-2">Manage Applications</h2>
            <p className="text-sm opacity-80">
              Review and update application statuses
            </p>
          </Link>
        </div>

        <Routes>
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/jobs" element={<JobManagement />} />
          <Route path="/admin/applications" element={<ApplicationsList />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
