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
    return <div className="flex justify-center items-center h-screen text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white border border-gray-200 rounded-xl shadow-lg flex max-w-md p-6">
        {/* Profile Image Section */}
        <div className="flex-shrink-0">
          <img 
            src={userData.picture.large} 
            alt="User Profile" 
            className="w-40 h-40 rounded-full object-cover border border-gray-300" 
          />
        </div>

        {/* User Details Section */}
        <div className="ml-6 flex flex-col justify-center">
          <div className="mb-3 flex">
            <span className="font-bold text-gray-700 w-32">FirstName:</span>
            <span className="text-gray-800">{userData.name.first}</span>
          </div>
          <div className="mb-3 flex">
            <span className="font-bold text-gray-700 w-32">LastName:</span>
            <span className="text-gray-800">{userData.name.last}</span>
          </div>
          <div className="mb-3 flex">
            <span className="font-bold text-gray-700 w-32">Gender:</span>
            <span className="text-gray-800 capitalize">{userData.gender}</span>
          </div>
          <div className="flex">
            <span className="font-bold text-gray-700 w-32">Phone Number:</span>
            <span className="text-gray-800">{userData.phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
