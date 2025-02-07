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
    <div className="border-4 border-gray-700 rounded-2xl p-10 w-[600px] flex items-center space-x-16 bg-white mx-auto mt-12 shadow-2xl">
      {/* Image Box with More Spacing */}
      <div className="border-4 border-gray-700 rounded-2xl w-48 h-48 overflow-hidden ml-4 shadow-lg">
        <img
          src={userData.picture.large}
          alt="User Profile"
          className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
        />
      </div>
      
      {/* Details Section with Enhanced Spacing */}
      <div className="flex-grow space-y-6">
        <div>
          <div className="flex justify-between mb-3">
            <span className="text-sm font-bold text-gray-600">First Name</span>
            <span className="text-sm font-bold text-gray-600">Last Name</span>
          </div>
          <div className="flex justify-between bg-gray-100 p-4 rounded-xl shadow-md">
            <span className="font-semibold text-lg">{userData.name.first}</span>
            <span className="font-semibold text-lg">{userData.name.last}</span>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-bold text-gray-600 block mb-3">Gender</label>
          <div className="bg-gray-100 p-4 rounded-xl shadow-md">
            <span className="font-semibold text-lg capitalize">{userData.gender}</span>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-bold text-gray-600 block mb-3">Phone Number</label>
          <div className="bg-gray-100 p-4 rounded-xl shadow-md">
            <span className="font-semibold text-lg">{userData.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;