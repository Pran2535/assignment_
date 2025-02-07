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
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="border-4 border-gray-700 rounded-lg p-8 w-[500px] flex items-center space-x-10 bg-white shadow-2xl">
        {/* Image Box */}
        <div className="border-4 border-gray-700 rounded-lg w-40 h-40 overflow-hidden ml-4">
          <img 
            src={userData.picture.large} 
            alt="User Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        {/* Details Section */}
        <div className="flex-grow space-y-4">
          <div>
            <div className="flex space-x-16 mb-2">
              <span className="text-sm font-bold text-gray-600">FirstName</span>
              <span className="text-sm font-bold text-gray-600">LastName</span>
            </div>
            <div className="flex space-x-16 bg-gray-100 p-3 rounded-lg shadow-inner">
              <span className="font-semibold text-gray-800">{userData.name.first}</span>
              <span className="font-semibold text-gray-800">{userData.name.last}</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 block mb-2">Gender</label>
            <div className="bg-gray-100 p-3 rounded-lg shadow-inner">
              <span className="font-semibold capitalize text-gray-800">{userData.gender}</span>
            </div>
          </div>
          <div>
            <label className="text-sm font-bold text-gray-600 block mb-2">Phone Number</label>
            <div className="bg-gray-100 p-3 rounded-lg shadow-inner">
              <span className="font-semibold text-gray-800">{userData.phone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;