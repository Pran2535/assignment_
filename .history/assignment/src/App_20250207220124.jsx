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
    return <div className="flex justify-center items-center h-screen text-xl">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="border-2 border-gray-300 rounded-lg p-8 w-[500px] flex items-center space-x-8 bg-white shadow-lg">
        {/* Image Box */}
        <div className="border-2 border-gray-300 rounded-lg w-32 h-32 overflow-hidden">
          <img
            src={userData.picture.large}
            alt="User Profile"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Details Section */}
        <div className="flex-grow">
          {/* First Name and Last Name Section */}
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-bold text-gray-600">First Name</span>
              <span className="text-sm font-bold text-gray-600">Last Name</span>
            </div>
            <div className="flex justify-between bg-gray-50 p-2 rounded-md">
              <span className="font-semibold text-gray-800">{userData.name.first}</span>
              <span className="font-semibold text-gray-800">{userData.name.last}</span>
            </div>
          </div>
          
          {/* Gender Section */}
          <div className="mb-4">
            <label className="text-sm font-bold text-gray-600 block mb-2">Gender</label>
            <div className="bg-gray-50 p-2 rounded-md">
              <span className="font-semibold text-gray-800 capitalize">{userData.gender}</span>
            </div>
          </div>
          
          {/* Phone Number Section */}
          <div>
            <label className="text-sm font-bold text-gray-600 block mb-2">Phone Number</label>
            <div className="bg-gray-50 p-2 rounded-md">
              <span className="font-semibold text-gray-800">{userData.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;