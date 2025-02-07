import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("https://randomuser.me/api/?page=1&results=1&seed=abc");
        setUserData(response.data.results[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUser();
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto mt-10 bg-white border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden">
      {/* Image Box */}
      <div className="w-full h-64 relative">
        <img
          src={userData.picture.large}
          alt="User Profile"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center">
          <p className="text-white font-semibold">{`${userData.name.first} ${userData.name.last}`}</p>
        </div>
      </div>
      {/* Details Section */}
      <div className="p-6 space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-bold text-gray-600">First Name</span>
            <span className="text-sm font-bold text-gray-600">Last Name</span>
          </div>
          <div className="flex justify-between bg-gray-100 p-3 rounded-lg shadow-md">
            <span className="font-semibold">{userData.name.first}</span>
            <span className="font-semibold">{userData.name.last}</span>
          </div>
        </div>
        <div>
          <label className="text-sm font-bold text-gray-600 block mb-2">Gender</label>
          <div className="bg-gray-100 p-3 rounded-lg shadow-md">
            <span className="font-semibold capitalize">{userData.gender}</span>
          </div>
        </div>
        <div>
          <label className="text-sm font-bold text-gray-600 block mb-2">Phone Number</label>
          <div className="bg-gray-100 p-3 rounded-lg shadow-md">
            <span className="font-semibold">{userData.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
