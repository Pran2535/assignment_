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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="border-2 border-black p-4 w-[400px] flex items-center space-x-6 bg-white rounded-lg shadow-md">
        {/* Image Box */}
        <div className="border-2 border-black w-24 h-24 flex items-center justify-center p-1">
          <img 
            src={userData.picture.large} 
            alt="User" 
            className="w-full h-full object-cover" 
          />
        </div>
        {/* Details Section */}
        <div>
          <div className="flex space-x-8">
            <p className="font-semibold">FirstName</p>
            <p className="font-semibold">LastName</p>
          </div>
          <div className="flex space-x-8">
            <p>{userData.name.first}</p>
            <p>{userData.name.last}</p>
          </div>
          <div className="mt-2">
            <p className="font-semibold">Gender</p>
            <p>{userData.gender}</p>
          </div>
          <div className="mt-2">
            <p className="font-semibold">Phone Number</p>
            <p>{userData.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
