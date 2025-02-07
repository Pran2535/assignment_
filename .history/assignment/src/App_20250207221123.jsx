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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="border-2 border-black p-4 flex items-center bg-white shadow-md">
        {/* Image Box */}
        <div className="border-2 border-black w-32 h-32 flex items-center justify-center overflow-hidden">
          <img src={userData.picture.large} alt="User Profile" className="w-full h-full object-cover" />
        </div>
        
        {/* Details Section */}
        <div className="ml-8">
          {/* First Name and Last Name Section */}
          <div className="flex">
            <span className="mr-4 font-semibold">{userData.name.first}</span>
            <span className="font-semibold">{userData.name.last}</span>
          </div>
          
          {/* Gender Section */}
          <div className="mt-2 font-medium">{userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1)}</div>
          
          {/* Phone Number Section */}
          <div className="mt-2 font-medium">{userData.phone}</div>
        </div>
      </div>
    </div>
  );
};

export default App;